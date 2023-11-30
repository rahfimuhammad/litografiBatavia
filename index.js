const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const server = express();

// Mengizinkan permintaan dari semua domain (ini mungkin tidak cocok untuk produksi)
server.use(cors());

// Gunakan router JSON Server untuk mengelola rute
server.use(jsonServer.router('db.json'));

// Port server
const port = 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
