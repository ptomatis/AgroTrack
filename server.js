const http = require('http');
const url = require('url');
const { route } = require('./lib/router');

const PORT = 8888;

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = url.parse(req.url, true);
    await route(req, res, pathname);
  } catch (e) {
    // en caso de excepción no controlada
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Error 500</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
