class Main {
    constructor() {
      // Cargar usuarios desde localStorage al iniciar
      this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }
  
    guardarUsuarios() {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  
    registrarUsuario(nuevoUsuario) {
      this.usuarios.push(nuevoUsuario);
      this.guardarUsuarios();
    }
  
    verificarCredenciales(usuario, contrasena) {
      return this.usuarios.find(
        u => u.usuario === usuario && u.contrasena === contrasena
      );
    }
  
    mostrarUsuarios() {
      console.log("Usuarios registrados:", this.usuarios);
    }
  }
  
  const app = new Main();
  