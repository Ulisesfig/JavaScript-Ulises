
const productos = [
  { id: 1, nombre: "Top Negro (Microfibra)", precio: 6000 },
  { id: 2, nombre: "Top Blanco", precio: 6000 },
  { id: 3, nombre: "Top Bordo", precio: 5500 },
  { id: 4, nombre: "Top Irregular Bordo", precio: 5500 },
  { id: 5, nombre: "Top Manga Larga Blanco", precio: 7000 },
  { id: 6, nombre: "Top Cruzado Negro", precio: 5000 },
  { id: 7, nombre: "Top Cuello en V", precio: 5500 },
  { id: 8, nombre: "Musculosa Bordo", precio: 4500 },
  { id: 9, nombre: "Strap Negro", precio: 5000 },
  { id: 10, nombre: "Vestido Blanco", precio: 7500 },
  { id: 11, nombre: "Top Beige", precio: 5000 },
  { id: 12, nombre: "Musculosa Negra", precio: 4000 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("lista-productos");
const itemsCarrito = document.getElementById("items-carrito");
const totalElemento = document.getElementById("total");
const buscador = document.getElementById("buscador");
const filtroPrecio = document.getElementById("filtroPrecio");
const valorFiltro = document.getElementById("valorFiltro");

buscador.addEventListener("input", () => mostrarProductos());
filtroPrecio.addEventListener("input", () => {
  valorFiltro.textContent = `Hasta $${filtroPrecio.value}`;
  mostrarProductos();
});


function mostrarProductos() {
  const texto = buscador.value.toLowerCase();
  const precioMax = parseInt(filtroPrecio.value);
  listaProductos.innerHTML = "";
  productos
    .filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(texto) &&
        producto.precio <= precioMax
    )
    // creador de tarjetas
    .forEach((producto) => {
      const div = document.createElement("div");
      div.className = "col-12 col-sm-6 col-md-4 col-lg-3";
      div.innerHTML = `
        <div class="producto p-1 d-flex flex-column justify-content-between h-100">
          <img src="content/${producto.id}.jpg" alt="${producto.nombre}" />
          <div>
            <h5>${producto.nombre}</h5>
            <p class="mb-2">Precio: $${producto.precio}</p>
            <label for="talle-${producto.id}" class="form-label">Talle:</label>
            <select class="form-select form-select-sm" id="talle-${producto.id}">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm w-100 mt-3" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
      `;
      listaProductos.appendChild(div);
    });
}

// carrito
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const talleSeleccionado = document.getElementById(`talle-${id}`).value;
  carrito.push({ ...producto, talle: talleSeleccionado });
  guardarCarrito();
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  itemsCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} (${item.talle}) - $${item.precio}
      <button class="eliminar" onclick="eliminarDelCarrito(${index})">X</button>
    `;
    itemsCarrito.appendChild(li);
    total += item.precio;
  });
  totalElemento.textContent = total;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  if (confirm("¿Estás seguro de realizar la compra?")) {
    vaciarCarrito();
    
    const alerta = document.getElementById("alertaCompra");
    alerta.classList.remove("d-none");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById("carritoCanvas")
    );
    bsOffcanvas.hide();
    
    setTimeout(() => {
      alerta.classList.add("d-none");
    }, 3000);
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  window.location.href = 'login.html'; 
}

mostrarProductos();
actualizarCarrito();
