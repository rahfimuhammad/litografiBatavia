const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

// Middleware untuk memeriksa referer dari permintaan POST
const checkReferer = (req, res, next) => {
  const referer = req.get('Referer');
  // Sesuaikan dengan domain Anda
  if (referer && referer.startsWith('https://abc.com')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

server.use(middlewares);
server.use(bodyParser.json()); // Pastikan middleware ini ada
server.use(checkReferer);

// Endpoint POST untuk menambahkan ulasan pada museum tertentu
server.post('/museum/:id/reviews', (req, res) => {
  const museumId = parseInt(req.params.id);
  const review = req.body;

  const museums = router.db.get('museum').value();
  const museum = museums.find((m) => m.id === museumId);

  if (museum) {
    museum.reviews = museum.reviews || [];
    museum.reviews.push(review);

    router.db.set('museum', museums).write();

    res.json(review);
  } else {
    res.status(404).json({ message: 'Museum not found' });
  }
});

// Endpoint POST untuk menambahkan rating pada museum tertentu
server.post('/museum/:id/rate', (req, res) => {
  const museumId = parseInt(req.params.id);
  const rating = req.body.rating;

  const museums = router.db.get('museum').value();
  const museum = museums.find((m) => m.id === museumId);

  if (museum) {
    museum.ratings = museum.ratings || [];
    museum.ratings.push(rating);

    router.db.set('museum', museums).write();

    res.json({ rating });
  } else {
    res.status(404).json({ message: 'Museum not found' });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
