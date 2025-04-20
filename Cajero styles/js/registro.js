function registrarUsuario(event) {
  event.preventDefault(); // 👈 esto evita que el form recargue la página

  let tipoId = document.getElementById('tipoId').value;
  let numeroId = document.getElementById('numeroId').value;
  let usuario = document.getElementById('usuario').value;
  let correo = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;
  let confirmar = document.getElementById('confirmarContrasena').value;
  let saldo = 0;

  let idValido = app.verificarregistro(numeroId);
  let usuarioValido = app.verificarregistro2(usuario);
  let correoValido = app.verificarregistro3(correo);

  if (idValido) {
    alert("El documento ya está en uso.");
    return false;
  } else if (usuarioValido) {
    alert("El usuario ya está en uso.");
    return false;
  } else if (correoValido) {
    alert("El correo ya está en uso.");
    return false;
  } else if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  let nuevoUsuario = {
    tipoId,
    numeroId,
    usuario,
    correo,
    contrasena,
    saldo
  };

  app.registrarUsuario(nuevoUsuario);
  alert("Usuario registrado con éxito");
  limpiarCampos();

  document.getElementById("loader").style.display = "flex";
  document.getElementById("mensajeRedireccion").textContent = "Inicia sesión para continuar...";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);

  return false; // 👈 opcional, pero ayuda a asegurar que el form no se envíe
}


function limpiarCampos(){ /*Funcion para limpiar campos del registro */
  document.getElementById('tipoId').value="";
  document.getElementById('numeroId').value="";
  document.getElementById('usuario').value="";
  document.getElementById('correo').value="";
  document.getElementById('contrasena').value="";
  document.getElementById('confirmarContrasena').value="";
  }