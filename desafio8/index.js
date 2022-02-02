const express = require('express')
const { Router } = express;

const app = express()
const productos = Router()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('public'))

let listarProductos = ['Nevera','Televisor']

productos.get('/', (req, res) =>{
    res.send(listarProductos)
})
productos.post('/', (req, res) =>{
    const name = req.body.nombreProducto
    listarProductos.push(name)
    res.send(listarProductos)
})

app.use('/productos', productos)

app.listen(8080)