function entrar(event) {
  event.preventDefault();

  const usuario = document.getElementById('usuarioLogin').value;
  const contrasena = document.getElementById('contrasenaLogin').value;

  const usuarioValido = app.verificarCredenciales(usuario, contrasena);

  if (usuarioValido) {
    alert(`¡Bienvenido ${usuarioValido.usuario}!`);
    window.location.href = "transacciones.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}
