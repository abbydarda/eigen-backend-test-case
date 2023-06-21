const services = require('./services');

module.exports = {
 loanBook: async (req, res, next) => {
  try {
   const { memberCode, bookCode } = req.body;

   const data = await services.loanBook({ memberCode, bookCode });

   res.status(201).json(data);
  } catch (error) {
   next(error);
  }
 },

 returnBook: async (req, res, next) => {
  try {
   const { memberCode, bookCode } = req.body;

   const data = await services.returnBook({ memberCode, bookCode });

   res.status(201).json(data);
  } catch (error) {
   next(error);
  }
 },
};
