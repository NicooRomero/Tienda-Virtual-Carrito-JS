const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCompra = document.querySelector('#lista-netbooks');
let articulosCarrito = [];

//eventlisteners

cargarEventListeners();
function cargarEventListeners() {
    
    listaCompra.addEventListener('click', agregarCompra);

    
    carrito.addEventListener('click', eliminarCompra);
    
    
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    });

    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    });
}

//funciones

function agregarCompra(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const compraSeleccionado = e.target.parentElement.parentElement;
        datosCompra(compraSeleccionado);
    }
}


function eliminarCompra(e) {
    if(e.target.classList.contains('borrar-compra')) {
        const compraId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( compra => compra.id !== compraId);

        carritoHTML();
    };
}



function datosCompra(compra) {

    
    const infoCompra = {
        imagen: compra.querySelector('img').src,
        titulo: compra.querySelector('h4').textContent,
        precio: compra.querySelector('.precio span span').textContent,
        id: compra.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya exite
    const existe = articulosCarrito.some( compra => compra.id === infoCompra.id);
    if(existe) {
        const compras = articulosCarrito.map( compra => {
            if( compra.id === infoCompra.id ) {
                compra.cantidad++;
                compra.precio = infoCompra.precio * compra.cantidad;
                return compra; // retorna objeto actualizado
            } else {
                return compra; //retorna objeto actual
            }
        });
        articulosCarrito = [...compras]; 
    } else{
       //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCompra]; 
    }

    

    carritoHTML();
}

//mostrar el carrito de compras en el html

function carritoHTML() {

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( compra => {
        const { imagen, titulo, precio, cantidad, id } = compra;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-compra" data-id="${id}" > X </a>
            </td>
        `;

        //agregar el html al carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

    //agregar al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML() {

    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}