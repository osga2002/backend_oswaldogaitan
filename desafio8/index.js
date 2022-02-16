const express = require('express')
const fs = require('fs')
const { Router } = express;

const app = express()
const productos = Router()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('public'))

let listarProductos = []

productos.get('/', (req, res) =>{
    res.send(listarProductos)
})
productos.post('/', (req, res) =>{
    const name = {
        'producto' : req.body.nombreProducto,
        'valorProducto': req.body.valorProducto,
        'marcaProducto': req.body.marcaProducto
    }
    listarProductos.push(name);
   // let listarProductos = []
    console.log('Jesus')
    
        const status = fs.existsSync('./productos.txt');
        if (!status) {
            console.log('Jesus')
         /* const objeID = { ...name, id: 1 };
          listarProductos.push(objeID);
          const objetoJson = JSON.stringify(listarProductos);
  
          await fs.promises.writeFile(
            `./productos.txt`,
            objetoJson,
            "utf-8"
          );*/
          return console.log("No existe");
        }else{
            const documento = fs.readFile(
                './productos.txt',
                "utf-8",
                function(req, rep){
                    console.log(rep);
                }
              );
              console.log('Jehova')
              const documentoParse = documento;
              listarProductos = documentoParse;
              console.log(listarProductos);
              if (listarProductos) {
                console.log(listarProductos);
                id = listarProductos.id + 1;
                const objetoId = { ...listarProductos, id }; 
                listarProductos.push(objetoId);
                const contenidotxt = listarProductos;
                console.log(contenidotxt);
                console.log(objetoId);
                fs.writeFile(
                    './productos.txt',
                  contenidotxt,
                  "utf-8"
                );
                return id;
              }
        }
    
    //listarProductos.push(name)
    res.send(listarProductos)
})

app.use('/productos', productos)

app.listen(8080)