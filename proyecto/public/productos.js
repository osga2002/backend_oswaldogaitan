const fs = require('fs');

class productosClass {
    productos = [];
  
    constructor(productos) {
      this.productos = productos;
    }
  
    listadoProductos() {
      const leer = fs.readFileSync("public/productos.txt", "utf-8");
      const contenido = JSON.parse(leer)
      console.log(contenido);
      return contenido
    }
  
    save(producto) {
      const data = this.getAll()
      let nId = 0
      nId = parseInt(data[data.length-1].id) +1;
      producto.id = nId;
      data.push(producto)
      try {
        fs.writeFileSync('public/productos.txt', JSON.stringify(data, null, 4))
        return producto.id
      } catch (error) {
        return false
      }
    }
  
    getById(id) {
      const data = this.getAll()
      return data.find(producto => producto.id == id)
    }
    getAll() {
      try {
        const data = fs.readFileSync('public/productos.txt', 'utf-8')
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
          fs.writeFileSync('public/productos.txt', JSON.stringify(deleted, null, 4))
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
        fs.writeFileSync('public/productos.txt', JSON.stringify(data, null, 4))
      } catch (error) {
        throw new Error('No se pudo eliminar el producto')
      }
    }
    update(id, body) {
      const data = this.getAll()
      const producto = data.find(producto => producto.id === id)
      console.log(producto);
      console.log("Mi señor");
      if (producto) {
        data.forEach(element => {
          if (element.id === id) {
            element.price = body.price
            element.producto = body.producto
            element.marca = body.marca
          }
        })
        try {
          fs.writeFileSync('public/productos.txt', JSON.stringify(data, null, 4))
          return producto
        } catch (error) {
          throw new Error('No se pudo actualizar el producto')
        }
      } else {
        return false
      }
    }
    leerArrayRandom() {
      fs.readFile('/public/productos.txt', 'utf-8',(error, contenido)=>{
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
  module.exports = productosClass