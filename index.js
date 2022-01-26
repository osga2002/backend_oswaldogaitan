const express = require("express");
const fs = require("fs");
const { Router} = require("express")

const app = express();
const productos = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let port = 8080 || process.env.port;

class Contenedor {
  productos = [];

  constructor(productos) {
    this.productos = productos;
  }

  listadoProductos() {
    const leer = fs.readFileSync("productos.txt", "utf-8");
    const contenido = JSON.parse(leer)
    console.log(contenido);
    return contenido
  }

  save(producto) {
   // producto.id = Date.now()
   
    const data = this.getAll()
    data.push(producto)
    try {
      fs.writeFileSync('productos.txt', JSON.stringify(data, null, 4))
      return producto.id
    } catch (error) {
      return false
    }
  }

  getById(id) {
    const data = this.getAll()
    return data.find(producto => producto.id === id)
  }
  getAll() {
    try {
      const data = fs.readFileSync('productos.txt', 'utf-8')
      if (data.length >= 0) {
        return JSON.parse(data)
      } else {
        return false
      }

    } catch (error) {
      throw new Error('No se lee el archivo')
    }
  }
  deleteById(id) {
    const data = this.getAll()
    const deleted = data.filter(producto => producto.id !== id)
    if (this.getById(id)) {
      try {
        fs.writeFileSync('productos.txt', JSON.stringify(deleted, null, 4))
        return true
      } catch (error) {
        throw new Error('No se pudo eliminar el producto')
      }
    } else {
      return false
    }

  }
  deleteAll() {
    const data = []
    try {
      fs.writeFileSync('productos.txt', JSON.stringify(data, null, 4))
    } catch (error) {
      throw new Error('No se pudo eliminar el producto')
    }
  }
  update(id, body) {
    const data = this.getAll()
    const producto = data.find(producto => producto.id === id)
    if (producto) {
      data.forEach(element => {
        if (element.id === id) {
          element.price = body.price
          element.thumbnail = body.thumbnail
          element.title = body.title
        }
      })
      try {
        fs.writeFileSync('productos.txt', JSON.stringify(data, null, 4))
        return producto
      } catch (error) {
        throw new Error('No se pudo actualizar el producto')
      }
    } else {
      return false
    }
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
listarProductos.listadoProductos();

app.get("/", function (req, res) {
  if (listarProductos.length ===0) {    
    return res.send("<h1>No hay PRODUCTOS<h1>");
  }else{
    return res.json({'Listado de productos': listarProductos.listadoProductos()});
    
  }
});

app.get("/api/productos", function (req, res) {
  let resp = listarProductos.getAll().length !== 0
      ? { productos: listarProductos.getAll() }
      : { error: 'No hay Productos' }
  res.json(resp)
});

app.get("/api/productos/:id", function (req, res) {
  const { id } = req.params;
    let resp = listarProductos.getById(parseInt(id))
    ? { Producto_Encontrado:listarProductos.getById(parseInt(id)) }
    : { error: 'No fue encontrado' }
    res.json( resp )
});

app.post("/api/productosGuardar/", function (req, res) {
  let prod = {"producto":"Sala", "Price":1800000,"marca":"Marlente"}
  let resp = listarProductos.save(prod)
    ? { productos: listarProductos.save(prod)}
    : { error: 'error al guardar el producto' }
    res.json( resp )
});

app.put("/api/productos/:id", function (req, res) {
  const { id } = req.params;
  let resp = listarProductos.update(parseInt(id), req.body)
  ? { productos: listarProductos.update(parseInt(id), req.body) }
  : { error: 'error al actualizar el producto' }
  res.json( resp )
});
app.delete("/api/productos/:id", function (req, res) {
    const { id } = req.params;
    res.json({
        msg: p.deleteById(parseInt(id))
            ? 'producto eliminado'
            : 'no se pudo eliminar el producto o el producto no existe'
    })
});

app.listen(port, () => {
  console.log(`Servidor http escuchando en http://localhost:${port}`);
});