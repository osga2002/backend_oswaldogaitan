const express = require("express");
//cargamos el modulo handlebars
const app = express();
const { options } = require('./options/mariaDB.js')
const knex = require('knex')(options)
//-------------------------------------//

//Uso de websockets
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//------------------------------------//
const PORT = 3000;
const exphbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
//configuramos handlebars
app.engine(
  "hbs", //Nombre referencia a la plantilla(se usa luego en set)
  exphbs.engine({
    //funcion de configuracion  handlebars
    extname: "hbs", //extension a utilizar
    defaultLayout: "index.hbs", //plantilla principal
    layoutsDir: __dirname + "/public/layouts", //ruta de plantilla principal
    // partialsDir: __dirname + "/public/partials/", //ruta a las plantillas parciales
  })
);

const listaProductos = [];

//establecemos el motor de plantilla que se utiliZA
app.set("view ingine", "hbs");
//establecemos directorio donde se encuentran los archivos de la plantilla
app.set("views", "public");

//handlebars

app.get("/", (req, res) => {
  res.render("datos.hbs", { listaProductos });
});

//espacio publico del servidor
app.use(express.static("public"));

const mensajes = [];

io.on("connection", (socket) => {
  console.log("Nuevo Cliente Conectado!");

  //incluyendo chat-----------------------//

  socket.emit("mensajes", mensajes);

  socket.on("mensaje", (data) => {
    mensajes.push(data);
    data.fechahora = new Date()
    knex('mensajes').insert(data)
    .then(()=> console.log("Mensaje Guardado"))
    .catch((err)=>{ console.log(err) })
    .finally(()=>{
      knex.destroy();
    })
    io.sockets.emit("mensajes", mensajes);
  });

  //--------------------------------------------//

  //incluyendo lista de productos---------------//

  socket.emit("listaProductos", listaProductos);

  socket.on("producto", (data) => {
    listaProductos.push(data);
    data.fechahora = new Date()
     knex('productos').insert(data)
    .then(()=> console.log("Producto Creado"))
    .catch((err)=>{ console.log(err) })
    .finally(()=>{
      knex.destroy();
    })
    io.sockets.emit("listaProductos", listaProductos);
  });
});

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});

connectedServer.on("error", (error) => {
  console.log(`Error en el Servidor ${error}`);
});
