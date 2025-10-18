Portal Interno Agrotrack
Estudiante: Pablo Tomatis
Legajo: 23.848.789

-------------------------------------------------------------------------

Ejecutar el Servidor: node server.js

Abrir Navegador en: http://localhost:8888/
Puerto: 8888 (configurable por variable de entorno PORT en server.js)

--------------------------------------------------------------------------

Rutas y Comportamiento:

GET /                :  Pagina Principal sirve public/index.html
GET /productos.html  :  Página estática de productos. (productos.html)
GET /contacto        :  Pagina con Formulario de Contacto (contacto.html)
GET /login           :  Pagina con Formulario de Login (login.html)

GET /contacto/listar :  Muestra el contenido de data/consultas.txt

POST /contacto/cargar:  Recibe nombre, email, mensaje y lo anexa al archivo data/consultas.txt
POST /auth/recuperar :  Parseo para obtener la ruta, user y clave, luego los datos osn devueltos en HTML dianmico

Ruta o archivo invalido: Devuelve el archivo 404.html (mensaje de error personalizado)


Colección de Postman : En la raíz del proyecto se incluye AgroTrack.postman_collection.json.
Importar coleccion en postman para efectuar las pruebas necesarias.

----------------------------------------------------------------------------

Formato consultas.txt

-------------------------
Fecha: 2025-10-06 15:00
Nombre: Juan Pérez
Email: jp@mail.com
Mensaje: Necesito información
-------------------------

El servidor fue desarrollado utilizando Node.js puro, sin frameworks, empleando módulos nativos como http, fs y url.
Se implementaron operaciones asíncronas para garantizar que el servidor no se bloquee mientras realiza tareas de entrada/salida (E/S), permitiendo atender múltiples solicitudes de manera eficiente.

Lectura de archivos estáticos:
Se utiliza fs.readFile() para cargar los archivos HTML, CSS e imágenes desde la carpeta public.
Esta función es asíncrona, por lo que el servidor puede continuar procesando otras peticiones mientras el archivo se lee desde el disco.

Procesamiento de formularios (POST):
La recepción del cuerpo del mensaje se maneja con eventos req.on('data') y req.on('end'), que funcionan de forma asíncrona.
Esto permite recibir los datos del formulario por partes sin bloquear la ejecución principal.

Guardado de consultas de contacto:
Se emplea fs.appendFile() para escribir en data/consultas.txt los mensajes enviados desde el formulario.
Esta operación también es asíncrona, lo que evita que el servidor quede detenido durante la escritura.

Listado de consultas:
Para mostrar las consultas previas, se usa nuevamente fs.readFile() de forma asíncrona, leyendo el archivo solo cuando es necesario.

El tipo de contenido devuelto al cliente se define mediante la cabecera Content-Type, estableciendo el MIME adecuado según la extensión del archivo (text/html, text/css, image/png, etc.).
Esto permite que el navegador interprete correctamente cada recurso.


El servidor devuelve códigos de estado HTTP adecuados:

200 OK cuando la respuesta es exitosa.
404 Not Found si la ruta o archivo solicitado no existe.
500 Internal Server Error cuando ocurre un error de lectura o escritura.