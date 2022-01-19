const express = require("express");
const fs = require("fs");

const app = express();
let PORT = 8080 || process.env.PORT;

class Contenedor {
  productos = [];

  constructor(productos) {
    this.productos = productos;
  }


  leerArray() {
    const leer = fs.readFileSync("productos.txt", "utf-8");
    const contenido = JSON.stringify(leer)
    console.log(contenido);
    return contenido
  }

  leerArrayRandom() {
    fs.readFile('productos.txt', 'utf-8',(error, contenido)=>{
        if (error) {
            throw new Error(`Error en lectura: ${error} `)
        }
        console.log('Lectura Correcta');
        const verArchivo = JSON.parse(contenido)
        const aleatorio = verArchivo[Math.floor(Math.random()*verArchivo.length)];
        console.log(aleatorio);
        const prod = JSON.stringify(aleatorio)
        return prod
    });
  }
}

const listarProductos = new Contenedor();
listarProductos.leerArrayRandom();

app.get("/", function (req, res) {
  res.send("<h1>LISTA DE PRODUCTOS<h1>");
});

app.get("/productos", function (req, res) {
  res.send(`Listado de productos: ${listarProductos.leerArray()}`);
});

app.get("/productosRamdom", function (req, res) {
    const aleatorio = listarProductos.leerArrayRandom();
    
  res.send(`El producto seleccionado: `+ aleatorio);
});

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});