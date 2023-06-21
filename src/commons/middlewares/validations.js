const { body, validationResult } = require('express-validator');

const loanBookValidation = () => {
 return [
  body('memberCode')
   .notEmpty()
   .withMessage('Kode member harus diisi')
   .isString()
   .withMessage('Kode member harus berupa string'),
  body('bookCode').custom((value) => {
   if (!Array.isArray(value)) {
    throw new Error('Kode buku harus berupa array');
   }
   if (value.length > 2) {
    throw new Error('Kode buku maksimal 2 item');
   }
   if (value.some((code) => typeof code !== 'string')) {
    throw new Error('Setiap kode buku harus berupa string');
   }
   return true;
  }),
 ];
};

const validate = (req, res, next) => {
 const errors = validationResult(req);
 if (errors.isEmpty()) {
  return next();
 }

 const errorMessages = errors.array().map((error) => ({
  message: error.msg,
 }));

 throw {
  statusCode: 400,
  error: errorMessages[0].message,
 };
};

module.exports = {
 loanBookValidation,
 validate,
};
