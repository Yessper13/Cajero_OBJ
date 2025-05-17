
function entrar(event) {
  event.preventDefault();
  let usuario = document.getElementById('usuarioLogin').value;
  let contrasena = document.getElementById('contrasenaLogin').value;
  let usuarioValido = Usuario.verificarCredenciales(usuario, contrasena);
  console.log(usuarioValido)
  if (usuarioValido) {
    // Guardar usuario e índice en sessionStorage
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));
    // Encontrar el índice del usuario dentro de la lista de usuarios
    let indice = Usuario.obtenerUsuarios().findIndex(u =>
      u.usuario === usuarioValido.usuario && u.contrasena === usuarioValido.contrasena
    );
    sessionStorage.setItem("indiceUsuarioActivo", indice);
    document.getElementById("loader").style.display = "flex";
    document.getElementById("mensajeRedireccion").textContent =
      `Hola ${usuarioValido.usuario}, Bienvenid@ a Next Step, tu app de cajero.`;
    setTimeout(() => {
      window.location.href = `transacciones.html`;
    }, 3000);
  } else {
    alert("Usuario o contraseña incorrectos.");
  }

}


