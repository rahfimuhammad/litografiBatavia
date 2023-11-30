const jsonServer = require('json-server');
const corsConfig = require('./cors-config'); // Impor konfigurasi CORS

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(jsonServer.rewriter(require('./routes.json')));

// Gunakan middleware CORS dari file konfigurasi
server.use(require('cors')(corsConfig));

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
