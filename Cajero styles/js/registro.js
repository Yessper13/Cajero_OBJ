
function Registrar(event) {
  alert("Registro");
  event.preventDefault();


  let tipoId = document.getElementById('tipoId').value;
  let numeroId = document.getElementById('numeroId').value;
  let usuario = document.getElementById('usuario').value;
  let correo = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;
  let confirmar = document.getElementById('confirmarContrasena').value;

  if (Usuario.verificarregistro(numeroId)) {
    alert("El documento ya está en uso.");
    return;
  } else if (Usuario.verificarregistro2(usuario)) {
    alert("El usuario ya está en uso.");
    return;
  } else if (Usuario.verificarregistro3(correo)) {
    alert("El correo ya está en uso.");
    return;
  } else if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const nuevoUsuario = new Usuario(tipoId, numeroId, usuario, correo, contrasena);
  Usuario.registrarUsuario(nuevoUsuario);

  alert("Usuario registrado con éxito");
  limpiarCampos();

  document.getElementById("loader").style.display = "flex";
  document.getElementById("mensajeRedireccion").textContent = "Inicia sesión para continuar...";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}



function limpiarCampos(){ /*Funcion para limpiar campos del registro */
  document.getElementById('tipoId').value="";
  document.getElementById('numeroId').value="";
  document.getElementById('usuario').value="";
  document.getElementById('correo').value="";
  document.getElementById('contrasena').value="";
  document.getElementById('confirmarContrasena').value="";
  }