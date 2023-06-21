const services = require('./services');

module.exports = {
 findAll: async (req, res, next) => {
  try {
   const { page, limit } = req.query;

   const data = await services.findAll({ page, limit });

   res.status(200).json(data);
  } catch (error) {
   next(error);
  }
 },
};
