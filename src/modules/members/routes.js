const controllers = require('./controllers');

const router = require('express').Router();

/**
 * @openapi
 * /api/member:
 *   get:
 *     summary: Endpoint untuk mendapatkan data member
 *     description: Mendapatkan data member dari server dengan paginasi
 *     tags:
 *       - member
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Halaman paginasi (default 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Jumlah data yang diambil per halaman (default 10)
 *     responses:
 *       200:
 *         description: Respon sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan respon
 *                 data:
 *                   type: array
 *                   description: Data member
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         description: Code member
 *                       name:
 *                         type: string
 *                         description: Nama member
 *                       bookBorrowed:
 *                         type: number
 *                         description: Jumlah buku yang dipinjam
 *                 totalCount:
 *                   type: integer
 *                   description: Jumlah total data member
 *                 currentPage:
 *                   type: integer
 *                   description: Halaman saat ini
 *                 totalPage:
 *                   type: integer
 *                   description: Jumlah total halaman
 */

router.get('/', controllers.findAll);

module.exports = router;
