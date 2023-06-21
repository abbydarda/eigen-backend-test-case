module.exports = {
 errorHandler: (err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
   return res.status(err.statusCode).send({ error: err.error });
  }

  return res.status(500).send({ error: 'Terjadi kesalahan server' });
 },
};
