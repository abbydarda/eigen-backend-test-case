const dayjs = require('dayjs');
const {
 Loan,
 Member,
 Book,
 LoanDetail,
 Penalties,
 Sequelize: { Op },
} = require('../../databases/models');

module.exports = {
 loanBook: async ({ memberCode, bookCode }) => {
  try {
   const member = await findMember(memberCode);
   const books = await findAvailableBooks(bookCode);
   checkPenalties(member);
   await createLoan(member.id, books);
   return {
    message: 'Pinjaman buku berhasil dibuat',
   };
  } catch (error) {
   throw error;
  }
 },

 returnBook: async ({ memberCode, bookCode }) => {
  try {
   const member = await findMember(memberCode);
   const memberLoan = member.Loans[0];

   if (bookCode.length !== memberLoan.total_book) {
    throw {
     statusCode: 403,
     error: 'Jumlah buku tidak sesuai',
    };
   }

   const loan = await findLoan(memberLoan.id);
   const bookLoans = loan.Books;
   const bookCodes = bookLoans.map((book) => book.code);

   const isBookCodeValid = bookCode.every((code) => bookCodes.includes(code));
   if (!isBookCodeValid) {
    throw {
     statusCode: 403,
     error: 'Buku yang dikembalikan tidak sesuai',
    };
   }

   const returnDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

   await updateLoan({ id: memberLoan.id, return_date: returnDate });

   const payloadBook = bookLoans.map((book) => ({
    id: book.id,
    stock: book.stock + 1,
   }));

   await updateBooks(payloadBook);

   const isLateReturn = dayjs(returnDate).isAfter(
    dayjs(memberLoan.due_date),
    'day'
   );

   if (isLateReturn) {
    await createPenalties(member.id);
   }

   return {
    message: 'Pengembalian buku berhasil',
   };
  } catch (error) {
   throw error;
  }
 },
};

const findMember = async (memberCode) => {
 const member = await Member.findOne({
  include: [Penalties, Loan],
  where: {
   code: memberCode,
  },
  order: [
   [Penalties, 'id', 'DESC'],
   [Loan, 'id', 'DESC'],
  ],
 });

 if (!member) {
  throw {
   statusCode: 404,
   error: 'Member tidak ditemukan',
  };
 }
 return member;
};

const findAvailableBooks = async (bookCode) => {
 const books = await Book.findAll({
  where: {
   code: {
    [Op.in]: bookCode,
   },
   stock: {
    [Op.gt]: 0,
   },
  },
 });

 if (books.length !== bookCode.length) {
  throw {
   statusCode: 404,
   error: 'Ada kode buku yang tidak ditemukan',
  };
 }

 return books;
};

const findLoan = async (loanId) => {
 const loan = await Loan.findOne({
  include: [Book],
  where: {
   id: loanId,
  },
 });

 return loan;
};

const checkPenalties = (member) => {
 if (
  member.Penalties.length > 0 &&
  dayjs(member.Penalties[0].end_date).isAfter(dayjs(), 'day')
 ) {
  throw {
   statusCode: 403,
   error: `Member tidak boleh meminjam buku sampai ${dayjs(
    member.Penalties[0].end_date
   ).format('DD/MM/YYYY')}`,
  };
 }
};

const createLoan = async (memberId, books) => {
 const loanDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
 const dueDate = dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss');
 const totalBooks = books.length;

 const createdLoan = await Loan.create({
  member_id: memberId,
  loan_date: loanDate,
  due_date: dueDate,
  total_book: totalBooks,
 });

 const loanDetails = books.map((book) => ({
  loan_id: createdLoan.id,
  book_id: book.id,
 }));

 await LoanDetail.bulkCreate(loanDetails);

 const updateStock = books.map((book) => ({
  id: book.id,
  stock: book.stock - 1,
 }));

 await Book.bulkCreate(updateStock, {
  updateOnDuplicate: ['stock'],
 });

 return createdLoan;
};

const updateLoan = async (payload) => {
 const key = Object.keys(payload);
 delete key.id;
 const loan = await Loan.update(payload, {
  where: {
   id: payload.id,
  },
  individualHooks: true,
 });

 return loan;
};

const updateBooks = async (payload) => {
 const key = Object.keys(payload[0]);
 delete key.id;
 const books = await Book.bulkCreate(payload, {
  updateOnDuplicate: key,
 });

 return books;
};

const createPenalties = async (memberId) => {
 const startDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
 const endDate = dayjs().add(2, 'day').format('YYYY-MM-DD HH:mm:ss');

 const createdPenalties = await Penalties.create({
  member_id: memberId,
  start_date: startDate,
  end_date: endDate,
 });

 return createdPenalties;
};
