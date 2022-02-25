const express = require('express');
const fs = require('fs');
const { Router } = express

const app = express();
const productos = Router();
const carrito = Router();
// ADMINISTRADOR
const administrador = false

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

const apiProducto = require('./public/productos.js')
const apiCarrito = require('./public/carrito.js')

const listarProductos = new apiProducto();
const carritoCompras = new apiCarrito();
listarProductos.listadoProductos();

let port = 8080 || process.env.port;



app.get('*', (req, res) => {
  const error = {
      error: -2,
      descripcion: `ruta '${req.url}' método ${req.method}, no implementada`
  }
  res.send(error)
})


productos.get("/", function (req, res) {
  let resp = listarProductos.listadoProductos().length !== 0
      ? { "Listado de Productos": listarProductos.listadoProductos() }
      : { error: 'No hay Productos Creados' }
  res.json(resp)
});

productos.get("/", function (req, res) {
  let resp = listarProductos.getAll().length !== 0
  ? { productos: listarProductos.getAll() }
  : { error: 'No hay Productos' }
  res.json(resp)
});
productos.get("/:id", (req, res) => {
  const id = req.params.id
  const all = listarProductos.getAll()
  const search = all.find(res => res.id == id)
  res.json(search || { error: `producto no encontrado` })
});

productos.get("/:id", function (req, res) {
  const { id } = req.params;
    let resp = listarProductos.getById(parseInt(id))
    ? { Producto_Encontrado:listarProductos.getById(parseInt(id)) }
    : { error: 'No fue encontrado' }
    res.json( resp )
});

productos.post("/", function (req, res) {
  const prod = {
    'producto' : req.body.producto,
    'price': req.body.price,
    'marca': req.body.marca,
    'id': req.body.id
  }
  let resp = listarProductos.save(prod)
    ? { productos: prod}
    : { error: 'error al guardar el producto' }
    res.json( resp )
});

productos.put("/:id", function (req, res) {  
  const { id } = req.params;
  let resp = listarProductos.update(parseInt(id), req.body)
  ? { Producto_Actualizado: req.body }
  : { error: 'error al actualizar el producto' }
  res.json( resp )
});
productos.delete("/:id", function (req, res) {
    const { id } = req.params;
    res.json({
        msg: listarProductos.deleteById(parseInt(id))
            ? 'producto eliminado'
            : 'no se pudo eliminar el producto o el producto no existe'
    })
});
carrito.post("/", function (req, res) {
  const items = {
    'cliente' : req.body.cliente,
    'productos': req.body.productos,
    'catidadTotal': req.body.cantidad
  }
 console.log(items);
  let resp = carritoCompras.create(items)
    ? { carritoCompras: items}
    : { error: 'error al guardar el carrito' }
    res.json( resp )
});
carrito.get("/", function (req, res) {
  let resp = carritoCompras.listadoCarrito().length !== 0
      ? { Carrito: carritoCompras.listadoCarrito() }
      : { error: 'No hay Carrito creado' }
  res.json(resp)
});

carrito.get("/:id", function (req, res) {
  const id = req.params.id
  const all = carritoCompras.listadoCarrito()
  const search = all.find(res => res.id == id)
  res.json(search || { error: `Carrito no encontrado` })
});
carrito.delete("/:id", function (req, res) {
  const { id } = req.params;
    res.json({
        msg: carritoCompras.deleteCarritoById(parseInt(id))
            ? 'Carrito eliminado'
            : 'no se pudo eliminar el carrito no existe'
    })
});
carrito.delete("/:id/productos/:id_pro", function (req, res) {
 const { id,id_pro } = req.params;
    res.json({
        msg: carritoCompras.deleteCarritoProductoById(parseInt(id))
            ? 'Carrito eliminado'
            : 'no se pudo eliminar el carrito no existe'
    })
});
carrito.post("/:id/:productos", function (req, res) {
  const { id } = req.params;
    res.json({
        msg: carritoCompras.deleteCarritoAllProductos(parseInt(id))
            ? 'Carrito eliminado'
            : 'no se pudo eliminar el carrito no existe'
    })
});

app.listen(port, () => {
  console.log(`Servidor http escuchando en http://localhost:${port}`);
});