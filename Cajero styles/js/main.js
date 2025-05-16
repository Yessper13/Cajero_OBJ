class Usuario {
  constructor(tipoId, numeroId, usuario, correo, contrasena,  saldo = 0,  cuentas=[]) {
    this.tipoId = tipoId;
    this.numeroId = numeroId;
    this.usuario = usuario;
    this.correo = correo;
    this.contrasena = contrasena;
    this.saldo = saldo;
    this.cuentas = cuentas;
  }
 
  // Método estático: obtener lista de usuarios desde localStorage
   static obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  // Método estático: guardar lista de usuarios en localStorage
  static guardarUsuarios(listaUsuarios) {
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    /* window.location.href = "index.html"; // Redirigir a la página de inicio */
  }

  // Método estático: registrar un nuevo usuario
  static registrarUsuario(nuevoUsuario) {
    const usuarios = Usuario.obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    Usuario.guardarUsuarios(usuarios);
  }

  // Método estático: verificar credenciales
  static verificarCredenciales(usuario, contrasena) {
    const usuarios = Usuario.obtenerUsuarios();
    return usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
  }

  // Métodos estáticos para validar duplicados
  static verificarRegistro(numeroId) {
    const usuarios = Usuario.obtenerUsuarios();
    return usuarios.find(u => u.numeroId === numeroId);
  }

  static verificarregistro2(usuario) {
    const usuarios = Usuario.obtenerUsuarios();
    return usuarios.find(u => u.usuario === usuario);
  }

  static verificarregistro3(correo) {
    const usuarios = Usuario.obtenerUsuarios();
    return usuarios.find(u => u.correo === correo);
  }

  // Mostrar todos los usuarios en consola (para depuración)
   static mostrarUsuarios() {
    console.log("Usuarios registrados:", Usuario.obtenerUsuarios());
  }

  static obtenerCuentas(){
    return JSON.parse(localStorage.getItem("cuentas")) || [];
  }
  static mostrarCuentas(){
    console.log(`Centas Registradas:`, Usuario.obtenerCuentas())
  }
}


function Registrar(event) {
  event.preventDefault();


  let tipoId = document.getElementById('tipoId').value;
  let numeroId = document.getElementById('numeroId').value;
  let usuario = document.getElementById('usuario').value;
  let correo = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;
  let confirmar = document.getElementById('confirmarContrasena').value;

  if (Usuario.verificarRegistro(numeroId)) {
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