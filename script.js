

let carrito =[]

function agregarCarrito(productId) {
    let buff = JSON.parse(sessionStorage.getItem("carrito")); //Agarro el carrito del session storage
    if (buff != null) { //Chequeo si esta vacio
        carrito = buff //Si no esta vacio, lo guardo
    }

    carrito.push(productId) //Agrega al carrito el id del producto
    sessionStorage.setItem("carrito", JSON.stringify(carrito)) //Guarda en session storage el carrito
}