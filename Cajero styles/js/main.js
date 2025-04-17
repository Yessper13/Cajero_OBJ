class Main {//Clase donde se almacenará los objetos y los métodos
    constructor() {
      // Cargar usuarios desde localStorage al iniciar
      this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }
    registrarUsuario(nuevoUsuario) {//Metodo para registrar un usuario nuevo con .push
      this.usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    verificarCredenciales(usuario, contrasena) {//Metodo para verificar credenciales existentes y autorizar inicio de sesión
      return this.usuarios.find(
        u => u.usuario === usuario && u.contrasena === contrasena
      );
    }

    verificarregistro(numeroId) {//Conjunto de metodos que validan que no se registren 2 usuarios con el mismo ID,Usuraio o Correo
      return this.usuarios.find(u => u.numeroId === numeroId);
    }
    verificarregistro2(usuario) {
      return this.usuarios.find(u => u.usuario === usuario);
    }
    verificarregistro3(correo){
      return this.usuarios.find(u => u.correo === correo);
    }
    mostrarUsuarios() {//Metodo para ver en consola los usuarios registrados
      console.log("Usuarios registrados:", this.usuarios);
    }
  }
  
  let app = new Main();// Se instancia la clase y se le asigna a la variable app que nos permite ejecutar sus metodos
  