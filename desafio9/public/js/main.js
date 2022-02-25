const socket = io.connect();

//socket chat___------------------------//

socket.on("mensajes", (msjs) => {
  const mensajesHTML = msjs
    .map((msj) => `<span class="badge active badge-info">${msj.nameChat}</span><div><input type="text" class="form-control-sm" value="${msj.mensaje}"></div>`)
    .join("<br>");
    
  document.querySelector("p").innerHTML = mensajesHTML;
});

function addMessage(e) {
  const mensaje = {
    nameChat: document.getElementById("nameChat").value,
    mensaje: document.getElementById("text").value,
  };

  socket.emit("mensaje", mensaje);
  return false;
}

//socket productos ---------------------------//

socket.on("listaProductos", (prod) => {
  //const productoName = prod;
 // console.log(prod);
  const productoName = prod.map((dato) => `${dato.name}`)
  const productoModelo = prod.map((dato) => `${dato.modelo}`)
  const productoPrecio = prod.map((dato) => `${dato.precio}`)
  const productoReferencia = prod.map((dato) => `${dato.referencia}`)
  document.getElementById("tablaProductos").insertRow(-1).innerHTML = `<td>${productoName}</td><td>${productoModelo}</td><td>${productoPrecio}</td><td>${productoReferencia}</td>`;
});

function mostrarProductos(e) {
  const detalleProducto = {
    name: document.getElementById("name").value,
    modelo: document.getElementById("modelo").value,
    precio: document.getElementById("precio").value,
    referencia: document.getElementById("referencia").value,
  };
  console.log(detalleProducto)
  socket.emit("producto", detalleProducto);
  return false;
}
