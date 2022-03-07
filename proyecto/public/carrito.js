const fs = require('fs');

class carritoClass {
  carrito = [];
  constructor(carrito) {
    this.carrito = carrito;
  }

  listadoCarrito() {
    const leer = fs.readFileSync("public/carrito.txt", "utf-8");
    const contenido = JSON.parse(leer)
    return contenido
  }

  create(item) {
    const carrito = this.listadoCarrito()
    const nId = carrito.length == 0 ? 1 : carrito[carrito.length - 1].id + 1
    const time = Date(Date.now()).toString()
    const save = {
      cliente: item.cliente,
      productos: item.productos,
      catidadTotal: item.catidadTotal,
      timestamp: time,
      id: nId
    }
    carrito.push(save)
    try {
      fs.writeFileSync("public/carrito.txt", JSON.stringify(carrito, null, 2))
      return (save)
    } catch (error) {
      return (`Error al guardar: ${error}`)
    }
  }

  deleteCarritoById(id) {
    const carrito = this.listadoCarrito()
    const deleted = carrito.filter(carro => carro.id !== id)
    const search = carrito.find(resp => resp.id == id)
    if (typeof search !== 'undefined') {
      fs.writeFileSync('public/carrito.txt', JSON.stringify(deleted, null, 4))
      return true
    } else {
      return false
    }
  }

  deleteCarritoProductoById(id, id_prod) {
    const carrito = this.listadoCarrito()
    const encontrado = carrito.find(carro => carro.id === id)
    let productoId = '';
    if (encontrado != null) {
      productoId = encontrado.productos.find(producto => producto.id === id_prod)
      if (productoId) {
        let prodFinales = encontrado.productos.filter(producto => producto.id !== id_prod)
        delete encontrado.productos;
        encontrado['productos'] = prodFinales;
        const nuevosCarritos = carrito.filter(carro => carro.id !== id)
        nuevosCarritos.push(encontrado)
        fs.writeFileSync('public/carrito.txt', JSON.stringify(nuevosCarritos, null, 4))
        return true
      }
    }else{
      return false
    }
  }
  deleteCarritoAllProductos(id, productos) {
    const carrito = this.listadoCarrito()
    const encontrado = carrito.find(carro => carro.id === id)
    let productoId = '';
    if (encontrado != null) {      
        delete encontrado.productos;
        encontrado['productos'] = productos;
        const nuevosCarritos = carrito.filter(carro => carro.id !== id)
        nuevosCarritos.push(encontrado)
        fs.writeFileSync('public/carrito.txt', JSON.stringify(nuevosCarritos, null, 4))
        return true      
    }else{
      return false
    }
  }

  getByIdCarrito(id) {
    const carrito = this.listadoCarrito();
    const search = carrito.find(resp => resp.id == id)
    const prods = search.productos
    try {
      return prods || {
        error: `productos no encontrados`
      }
    } catch (error) {
      return (`Error al buscar: ${error}`)
    }
  }

  saveById(object, id) {
    const carrito = this.listadoCarrito()
    const index = carrito.findIndex(res => res.id == id)
    const saveIn = carrito[index]
    const array = saveIn.productos

    if (index == -1) {
      return {
        Error: `no se encontró el id ${id}`
      }
    } else {
      array.push(object)
      try {
        fs.writeFile(this.route, JSON.stringify(carrito, null, 2))
        return saveIn
      } catch (error) {
        return (`Error al actualizar: ${error}`)
      }
    }
  }

  updateById(id, idp) {
    const carrito = this.listadoCarrito()
    const cartIndex = carrito.findIndex(res => res.id == id)
    const prods = carrito[cartIndex].productos
    const index = prods.findIndex(res => res.idp == idp)

    if (index == -1) {
      return {
        error: `producto no encontrado`
      }
    }

    prods.splice(index, 1)
    try {
      fs.writeFile(this.route, JSON.stringify(carrito, null, 2))
      return {
        mensaje: `producto borrado`
      }
    } catch (error) {
      return (`Error al borrar: ${error}`)
    }
  }
}

module.exports = carritoClass