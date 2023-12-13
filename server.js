const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


server.use(cors());
server.use(middlewares);
server.use(router);

const port = 5147; // Порт, на котором будет запущен сервер JSON

server.listen(port, () => {
  console.log(`JSON Server запущен на порту ${port}`);
});

