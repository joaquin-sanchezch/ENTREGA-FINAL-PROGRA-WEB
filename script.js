

let carrito =[]

function agregarCarrito(productId) {
    let buff = JSON.parse(sessionStorage.getItem("carrito")); 
    if (buff != null) {
        carrito = buff 
    }

    carrito.push(productId) 
    sessionStorage.setItem("carrito", JSON.stringify(carrito)) 