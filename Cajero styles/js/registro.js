function registrarUsuario() {
  const tipoId = document.getElementById('tipoId').value;
  const numeroId = document.getElementById('numeroId').value;
  const usuario = document.getElementById('usuario').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const confirmar = document.getElementById('confirmarContrasena').value;

  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  const nuevoUsuario = {
    tipoId,
    numeroId,
    usuario,
    correo,
    contrasena
  };

  app.registrarUsuario(nuevoUsuario);

  alert("Usuario registrado con éxito");
  return false; // Prevenir recarga
}