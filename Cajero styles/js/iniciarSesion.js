function entrar() {
  let usuario = document.getElementById('usuarioLogin').value;
  let contrasena = document.getElementById('contrasenaLogin').value;

  let usuarioValido = app.verificarCredenciales(usuario, contrasena);

  if (usuarioValido) {
    alert(`¡Bienvenido ${usuarioValido.usuario}!`);
    window.location.href = "transacciones.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}
