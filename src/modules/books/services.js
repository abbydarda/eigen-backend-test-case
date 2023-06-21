const {
 Book,
 Sequelize: { Op },
} = require('../../databases/models');

module.exports = {
 findAll: async ({ page, limit }) => {
  try {
   const parsePage = parseInt(page) || 1;
   const parseLimit = parseInt(limit) || 10;

   const [book, countBook] = await Promise.all([
    Book.findAll({
     page: parsePage,
     limit: parseLimit,
     where: {
      stock: {
       [Op.gt]: 0,
      },
     },
    }),
    Book.count(),
   ]);

   const cleanBook = book.map((member) => {
    const { code, title, author, stock } = member;
    return { code, title, author, stock };
   });

   const currentPage = parsePage;
   const totalCount = countBook;
   const totalPage = Math.ceil(totalCount / parseLimit);

   const response = {
    message: 'Data berhasil diambil',
    data: cleanBook,
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
