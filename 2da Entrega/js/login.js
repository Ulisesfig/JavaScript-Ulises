// Mostrar formulario registro
function showRegister() {
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registerForm').classList.add('active');
  clearInputs();
}

// Mostrar formulario login
function showLogin() {
  document.getElementById('registerForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
  clearInputs();
}

// Limpiar inputs
function clearInputs() {
  const inputs = document.querySelectorAll('.form-section.active input');
  inputs.forEach(input => input.value = '');
}

// Registro de usuario
function registrarUsuario() {
  const nombre = document.getElementById('regNombre').value.trim();
  const apellido = document.getElementById('regApellido').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (!nombre || !apellido || !username || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.find(u => u.username === username)) {
    alert('El nombre de usuario ya está en uso.');
    return;
  }

  usuarios.push({ nombre, apellido, username, password });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Registro exitoso. Ahora podés iniciar sesión.');

  // Volver a login
  showLogin();
}

// Inicio de sesión
function iniciarSesion() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!username || !password) {
    alert('Por favor, completa ambos campos.');
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (usuario) {
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    window.location.href = './main.html';
  } else {
    alert('Nombre de usuario o contraseña incorrectos.');
  }
}
