let productos = [];
// Recupero el usuario y nombre activo del localStorage
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const nombreActivo = JSON.parse(localStorage.getItem("nombreActivo")) || "";
// Si el usuario tiene productos en el carrito, los traigo
let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActivo}`)) || [];

const listaProductos = document.getElementById("lista-productos");
const buscador = document.getElementById("buscador");
const filtroPrecio = document.getElementById("filtroPrecio");
const valorFiltro = document.getElementById("valorFiltro");
const itemsCarrito = document.getElementById("items-carrito");
const totalElemento = document.getElementById("total");

// Evento para cerrar sesión, borra el usuario activo y vuelve al login
document.getElementById("cerrarSesion").addEventListener("click", () => {
  Swal.fire({
    title: "Esta seguro que desea cerrar sesion?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#198754",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Si, quiero cerrar sesion",
    cancelButtonText:"No, mantener sesion",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "login.html";
    } 
});
});

// Limpia el carrito y actualiza la vista
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});

// Cuando el usuario finaliza la compra, muestro confirmación y vacío el carrito
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0){
    Swal.fire({
      title:"Carrito vacio",
      icon:"warning",
      showConfirmButton: false,
      timer:1500,
      timerProgressBar: true,
    })
    return
  }
  Swal.fire({
    title: "Esta seguro de confirmar la compra?",
    text: `El total de su compra es: $${totalElemento.textContent}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#198754",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Si, confirmo",
    cancelButtonText:"No, quiero seguir comprando",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Su compra se ha realizado con exito!",
        text: "Gracias por su compra",
        icon: "success",
      });
      carrito = [];
      guardarCarrito();
      actualizarCarrito();
    }
  });
  
});

// Filtro de productos por nombre y precio
buscador.addEventListener("input", mostrarProductos);
filtroPrecio.addEventListener("input", () => {
  valorFiltro.textContent = `Hasta $${filtroPrecio.value}`;
  mostrarProductos();
});

// Cargo los productos desde el JSON
function cargarProductos() {
  fetch("productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data;
      mostrarProductos();
    });
}

// Muestra los productos en pantalla según los filtros
function mostrarProductos() {
  const texto = buscador.value.toLowerCase();
  const precioMax = parseInt(filtroPrecio.value);
  listaProductos.innerHTML = "";

  productos
    .filter(p => p.nombre.toLowerCase().includes(texto) && p.precio <= precioMax)
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "col-6 col-md-3";
      div.innerHTML = `
        <div class="card h-100">
          <img src="content/${p.id}.jpg" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h6 class="card-title">${p.nombre}</h6>
            <p>$${p.precio}</p>
            <select class="form-select form-select-sm mb-2" id="talle-${p.id}">
              <option value="S">S</option><option value="M">M</option>
              <option value="L">L</option><option value="XL">XL</option>
            </select>
            <button class="btn btn-primary btn-sm w-100" data-id="${p.id}">Agregar</button>
          </div>
        </div>`;
      listaProductos.appendChild(div);
    });

  // Evento para agregar productos al carrito
  document.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const talle = document.getElementById(`talle-${id}`).value;
      const producto = productos.find(p => p.id === id);
      carrito.push({ ...producto, talle });
      Swal.fire({
        timer: 1000,
        title:`${producto.nombre} se agrego al carrito`,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      guardarCarrito();
      actualizarCarrito();
    });
  });
}

// Actualiza la lista del carrito en el HTML
function actualizarCarrito() {
  itemsCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item, i) => {
    // Acá muestro la imagen del producto en el carrito
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="./content/${item.id}.jpg" alt="${item.nombre}" style="width:50px; height:50px; object-fit:cover; margin-right:8px; vertical-align:middle;">
      ${item.nombre} (${item.talle}) - $${item.precio}
      <button class="btn btn-sm btn-danger ms-2" data-index="${i}">X</button>`;
    itemsCarrito.appendChild(li);
    total += item.precio;
  });
  totalElemento.textContent = total;

  // Botón para eliminar productos del carrito
  itemsCarrito.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = parseInt(btn.getAttribute("data-index"));
      carrito.splice(i, 1);
      guardarCarrito();
      actualizarCarrito();
    });
  });
}

// Guardo el carrito en el localStorage para que no se pierda
function guardarCarrito() {
  localStorage.setItem(`carrito_${usuarioActivo}`, JSON.stringify(carrito));
}

// Muestro el nombre del usuario en el nav
document.getElementById("bienvenida").textContent = `Bienvenido, ${nombreActivo}`;

// Inicio la carga de productos y actualizo el carrito
cargarProductos();
actualizarCarrito();
