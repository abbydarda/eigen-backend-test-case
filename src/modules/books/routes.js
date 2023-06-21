const controllers = require('./controllers');

const router = require('express').Router();

/**
 * @openapi
 * /api/book:
 *   get:
 *     summary: Endpoint untuk mendapatkan data book
 *     description: Mendapatkan data book yang tidak sedang dipinjam dari server dengan paginasi
 *     tags:
 *       - book
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
 *                   description: Data book
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         description: Code book
 *                       title:
 *                         type: string
 *                         description: Judul book
 *                       author:
 *                         type: string
 *                         description: Penulis book
 *                       stock:
 *                         type: integer
 *                         description: Stok book
 *                 totalCount:
 *                   type: integer
 *                   description: Jumlah total data book
 *                 currentPage:
 *                   type: integer
 *                   description: Halaman saat ini
 *                 totalPage:
 *                   type: integer
 *                   description: Jumlah total halaman
 */

router.get('/', controllers.findAll);

module.exports = router;
