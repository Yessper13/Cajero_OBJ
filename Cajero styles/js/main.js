class Usuario {
  constructor(tipoId, numeroId, usuario, correo, contrasena, saldo = 0) {
    this.tipoId = tipoId;
    this.numeroId = numeroId;
    this.usuario = usuario;
    this.correo = correo;
    this.contrasena = contrasena;
    this.saldo = saldo;
  }

  // Método estático: obtener lista de usuarios desde localStorage
   static obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  // Método estático: guardar lista de usuarios en localStorage
  static guardarUsuarios(listaUsuarios) {
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
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
  static verificarregistro(numeroId) {
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
}


 