const iniciar = document.getElementById("iniciar");
const registrarse = document.getElementById("registrarse");

// Cambio entre login y registro
document.getElementById("verRegistro").addEventListener("click", () => {
  document.getElementById("login").classList.add("d-none");
  document.getElementById("registro").classList.remove("d-none");
});

document.getElementById("verLogin").addEventListener("click", () => {
  document.getElementById("registro").classList.add("d-none");
  document.getElementById("login").classList.remove("d-none");
});

// Evento para iniciar sesión
iniciar.addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  if (!usuario || !password) {
    swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, ingresa usuario y contraseña"
    });
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
  // Verifico si el usuario y la contraseña son correctos
  const valido = usuarios.find(u => u.usuario === usuario && u.password === password);
  if (valido) {
    localStorage.setItem("usuarioActivo", JSON.stringify(valido.usuario));
    localStorage.setItem("nombreActivo", JSON.stringify(valido.nombre));
    window.location.href = "main.html";
  } else {
    swal.fire({
      icon: "error",
      title: "Credenciales incorrectas",
      text: "Por favor, verifica tu usuario y contraseña"
    });
  }
});

// Evento para registrar usuario nuevo
registrarse.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const usuario = document.getElementById("nuevoUsuario").value;
  const password = document.getElementById("nuevaPassword").value;
  if (!nombre || !apellido || !usuario || !password) {
    swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos para registrarte"
    });
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
  // Chequeo si el usuario ya existe
  if (usuarios.find(u => u.usuario === usuario)) {
    swal.fire({
      icon: "warning",
      title: "Usuario existente",
      text: "El usuario ya existe"
    });
    return;
  }
  usuarios.push({ nombre, apellido, usuario, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Registro exitoso, inicia sesión"
  });
  document.getElementById("verLogin").click();
});
