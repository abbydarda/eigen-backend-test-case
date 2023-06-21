const {
 Member,
 Loan,
 Sequelize: { Op },
} = require('../../databases/models');

module.exports = {
 findAll: async ({ page, limit }) => {
  try {
   const parsePage = parseInt(page) || 1;
   const parseLimit = parseInt(limit) || 10;

   const [members, countMember] = await Promise.all([
    Member.findAll({
     page: parsePage,
     limit: parseLimit,
     include: [Loan],
    }),
    Member.count(),
   ]);

   const cleanMember = members.map((member) => {
    const { code, name, Loans } = member;
    const loans = Loans.filter((loan) => loan.return_date === null);

    const bookBorrowed = loans.reduce(
     (total, loan) => total + loan.total_book,
     0
    );
    return { code, name, bookBorrowed };
   });

   const currentPage = parsePage;
   const totalCount = countMember;
   const totalPage = Math.ceil(totalCount / parseLimit);

   const response = {
    message: 'Data berhasil diambil',
    data: cleanMember,
    totalCount,
    currentPage,
    totalPage,
   };

   return response;
  } catch (error) {
   throw error;
  }
 },
};
