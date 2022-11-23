const baseDeDatos = [
    {
        id: 1,
        nombre: 'SODA CADIA',
        precio: 500,
    },
    {
        id: 2,
        nombre: 'SODA SAN PELLEGRINO',
        precio: 800,
    },
    {
        id: 3,
        nombre: 'SODA ITALIAN SPARKLING',
        precio: 300,
    },
    {
        id: 4,
        nombre: 'SODA PERRIER',
        precio: 550,
    },
    {
        id: 5,
        nombre: 'SODA SERAFINA',
        precio: 620,
    },
    {
        id: 6,
        nombre: 'SODA SAINT-GERON',
        precio: 550,
    },
    {
        id: 7,
        nombre: 'SODA ECO DE LOS ANDES',
        precio: 180,
    },
    {
        id: 8,
        nombre: 'SODA KIN',
        precio: 250,
    },
    {
        id: 9,
        nombre: 'SODA VILLAVICENCIO',
        precio: 300,
    },

    ];

let carrito = [];
let divisa = '$'

const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonFinalizar = document.querySelector('#boton-finalizar');

function renderizarCarrito() {

    DOMcarrito.textContent = '';
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn','rounded-5','btn-dark', 'mx-2');
        miBoton.textContent = 'x';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(producto) {
    const id = producto.target.dataset.item;
    let buff = JSON.parse(sessionStorage.getItem("carrito"));
    if (buff != null) {
        carrito = buff
    }
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function finalizarCompra() {
    vaciarCarrito()
    alert("¡Su compra ha sido realizada con exito!")
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonFinalizar.addEventListener('click', finalizarCompra);

renderizarCarrito();