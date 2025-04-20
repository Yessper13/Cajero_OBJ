function entrar(event) {
  event.preventDefault(); // Evita que se recargue la página

  let usuario = document.getElementById('usuarioLogin').value;
  let contrasena = document.getElementById('contrasenaLogin').value;

  // Verifica credenciales (debe estar definido en otro archivo, como main.js)
  let usuarioValido = app.verificarCredenciales(usuario, contrasena);
  
  if (usuarioValido) {
    document.getElementById("loader").style.display = "flex";
    document.getElementById("mensajeRedireccion").textContent = `Hola, ${usuarioValido.usuario} Bienvenid@ a nuestro cajero.`;

    setTimeout(() => {
      window.location.href = "transacciones.html"; // Redirección
    }, 3000);
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}
