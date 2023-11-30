const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(bodyParser.json()); // Pastikan middleware ini ada

// Endpoint POST untuk menambahkan ulasan pada museum tertentu
server.post('/museum/:id/reviews', (req, res, next) => {
  const museumId = parseInt(req.params.id);
  const review = req.body;  // Ambil data ulasan dari body request

  // Ambil data dari db.json
  const museums = router.db.get('museum').value();

  // Cari museum dengan id yang sesuai
  const museum = museums.find((m) => m.id === museumId);

  if (museum) {
    // Jika museum ditemukan, tambahkan ulasan ke dalam array reviews
    museum.reviews = museum.reviews || [];
    museum.reviews.push(review);

    // Simpan perubahan
    router.db.set('museum', museums).write();

    // Kirim ulasan yang baru ditambahkan
    res.json(review);
  } else {
    // Jika museum tidak ditemukan, kirim respons dengan status 404
    res.status(404).json({ message: 'Museum not found' });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
