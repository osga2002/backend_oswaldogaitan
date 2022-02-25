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
        const save = { cliente: item.cliente, productos:item.productos, catidadTotal: item.catidadTotal, timestamp: time, id: nId }
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
        
      if (this.getByIdCarrito(id)) {
        try {
          fs.writeFileSync('public/carrito.txt', JSON.stringify(deleted, null, 4))
          return true
        } catch (error) {
          throw new Error('No se pudo eliminar el producto')
        }
      } else {
        return false
      }
    }
    deleteCarritoProductoById(id,id_prod) {
        const carrito = this.listadoCarrito()
        const encontrado = carrito.filter(carro => carro.id === id)
        const porductoId = encontrado.filter(id_pro = encontrado.productos.id !== id_prod)
      if (this.getByIdCarrito(id)) {
        try {
          fs.writeFileSync('public/carrito.txt', JSON.stringify(deleted, null, 4))
          return true
        } catch (error) {
          throw new Error('No se pudo eliminar el producto')
        }
      } else {
        return false
      }
    }
    deleteCarritoAllProductos(id,id_prod) {
        const carrito = this.listadoCarrito()
        const encontrado = carrito.filter(carro => carro.id === id)
        const porductoId = encontrado.filter(id_pro = encontrado.productos.id !== id_prod)
      if (this.getByIdCarrito(id)) {
        try {
          fs.writeFileSync('public/carrito.txt', JSON.stringify(deleted, null, 4))
          return true
        } catch (error) {
          throw new Error('No se pudo eliminar el producto')
        }
      } else {
        return false
      }
    }

    getByIdCarrito(id) {
        const carrito = this.listadoCarrito()
        const search = carrito.find(resp => resp.id == id)
        const prods = search.productos

        try {
            return prods || { error: `productos no encontrados` }
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
            return {Error: `no se encontró el id ${id}`}
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
            return { error: `producto no encontrado` }
        }

        prods.splice(index, 1)
        try {
            fs.writeFile(this.route, JSON.stringify(carrito, null, 2))
            return { mensaje: `producto borrado` }
        } catch (error) {
            return (`Error al borrar: ${error}`)
        }
    }
}

module.exports = carritoClass