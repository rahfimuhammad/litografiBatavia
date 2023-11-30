const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const server = express();

// Mengizinkan permintaan dari semua domain (ini mungkin tidak cocok untuk produksi)
server.use(cors());

// Gunakan router JSON Server untuk mengelola rute
const router = jsonServer.router('db.json');

// Tambahkan middleware untuk menangani permintaan ke /museum/:id/reviews
server.use('/museum/:id/reviews', (req, res, next) => {
  // Dapatkan id museum dari parameter URL
  const museumId = parseInt(req.params.id);

  // Ambil data dari db.json
  const museums = router.db.get('museum').value();

  // Cari museum dengan id yang sesuai
  const museum = museums.find((m) => m.id === museumId);

  if (museum) {
    // Jika museum ditemukan, kirim ulasan
    res.json(museum.reviews || []);
  } else {
    // Jika museum tidak ditemukan, kirim respons dengan status 404
    res.status(404).json({ message: 'Museum not found' });
  }
});

// Gunakan router JSON Server untuk rute lainnya
server.use(router);

// Port server
const port = 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
