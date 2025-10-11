// Importar módulos necesarios (Todos Nativos de Node.js)

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');



// Creamos el servidor HTTP-----------------------------------------

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Ruta raíz
  if (pathname === '/') {
    serveFile('./public/index.html', res);
    return;
  }

  // Sirve cualquier archivo dentro de /public
  const filePath = path.join(__dirname, 'public', pathname);
  const ext = path.extname(filePath);

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[ext];

  if (contentType) {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        //res.writeHead(404, { 'Content-Type': 'text/html' });
        //res.end('<h1>404 - Archivo no encontrado</h1>');
        serveFile('./public/404.html', res, 404);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
    return;
  }

  // Si no coincide con ningún archivo o extensión
  //res.writeHead(404, { 'Content-Type': 'text/html' });
  //res.end('<h1>404 - Pagina no encontrada</h1><a href="/">Volver</a>');
  serveFile('./public/404.html', res, 404);
});


//-------------------------------------------------------------


// Iniciamos el servidor en el puerto 8888----------------------------
const PORT = 8888;
server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

function serveFile(filePath, res) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('<h1>Error interno del servidor</h1>');
        } else {
            const ext = path.extname(filePath);
            const mime = ext === '.html' ? 'text/html' : 'text/plain';
            res.writeHead(200, {'Content-Type': mime});
            res.end(content);
        }
    });
}
// ------------------------------------------------------------------