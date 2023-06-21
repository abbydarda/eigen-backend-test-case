const {
 loanBookValidation,
 validate,
} = require('../../commons/middlewares/validations');
const controllers = require('./controllers');

const router = require('express').Router();

/**
 * @openapi
 * /api/loan:
 *   post:
 *     summary: Endpoint untuk meminjam book
 *     description: Melakukan peminjaman book
 *     tags:
 *       - loan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/LoanRequest'
 *     responses:
 *      '201':
 *        description: Pesan Berhasil
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoanResponse'
 *      '400':
 *        description: Pesan error validasi
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '403':
 *        description: Pesan error forbidden
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '404':
 *        description: Pesan error data tidak ada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 * components:
 *  schemas:
 *   LoanRequest:
 *     type: object
 *     properties:
 *       memberCode:
 *         type: string
 *         description: Kode member
 *       bookCode:
 *         type: array
 *         items:
 *           type: string
 *         maxItems: 2
 *         description: Kode buku
 *   LoanResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Pesan respon
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */
router.post('/', [loanBookValidation(), validate], controllers.loanBook);

/**
 * @openapi
 * /api/loan/return:
 *   post:
 *     summary: Endpoint untuk mengembalikan book
 *     description: Melakukan pengembalian book
 *     tags:
 *       - loan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/LoanRequest'
 *     responses:
 *      '201':
 *        description: Pesan Berhasil
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoanResponse'
 *      '400':
 *        description: Pesan error validasi
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '403':
 *        description: Pesan error forbidden
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      '404':
 *        description: Pesan error data tidak ada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 * components:
 *  schemas:
 *   LoanRequest:
 *     type: object
 *     properties:
 *       memberCode:
 *         type: string
 *         description: Kode member
 *       bookCode:
 *         type: array
 *         items:
 *           type: string
 *         maxItems: 2
 *         description: Kode buku
 *   LoanResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Pesan respon
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */
router.post(
 '/return',
 [loanBookValidation(), validate],
 controllers.returnBook
);

module.exports = router;
