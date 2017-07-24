const restify = require('restify');
const server = restify.createServer();

server.get('/test', (req, res) => {
  res.send({ ok:'OK' });
});

server.listen(3000);
