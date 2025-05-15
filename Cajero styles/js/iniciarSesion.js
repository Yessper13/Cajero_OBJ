
function entrar(event) {
  event.preventDefault();
  let usuario = document.getElementById('usuarioLogin').value;
  let contrasena = document.getElementById('contrasenaLogin').value;
  let usuarioValido = Usuario.verificarCredenciales(usuario, contrasena);
  let cuentas = usuarioValido.cuentas;
  
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
      `Hola ${usuarioValido.usuario}, Bienvenid@ a nuestro cajero. Tienes ${cuentas.length} cuenta(s) registrada(s).`;
    setTimeout(() => {
      window.location.href = `transacciones.html?cuentas=${cuentas.length}`;
    }, 3000);
  } else {
    alert("Usuario o contraseña incorrectos.");
  }

}


