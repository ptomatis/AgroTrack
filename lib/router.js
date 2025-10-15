const { handleStatic } = require('./handlers/static');
const { handleLogin } = require('./handlers/login');
const { handleContactoGet, handleContactoPost } = require('./handlers/contacto');
const { handleNotFound } = require('./handlers/errors');

async function route(req, res, pathname) {
  const method = req.method;

  // 1) Rutas de aplicación (dinámicas)
  if (await handleLogin(req, res, pathname, method)) return;
  if (await handleContactoPost(req, res, pathname, method)) return;
  if (handleContactoGet(req, res, pathname, method)) return;

  // 2) Archivos estáticos
  if (handleStatic(req, res, pathname)) return;

  // 3) Si nada matchea → 404
  handleNotFound(res);
}

module.exports = { route };
