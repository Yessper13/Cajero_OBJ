class Usuario {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.saldo = 0;
        this.historial = [];
    }

    get User() {
        return this.nombre;
    }

    get Email() {
        return this.email;
    }

    get Password() {
        return this.password;
    }

    set Password(password) {
        this.password = password;
    }

    agregarMovimiento(movimiento) {
        this.historial.push(movimiento);
    }
}

const usuariosRegistrados = [];

function agregarUsuario(usuario) {
    usuariosRegistrados.push(usuario);
}

function obtenerUsuarios() {
    return usuariosRegistrados;
}

function buscarUsuarioPorNombre(nombre) {
    return usuariosRegistrados.find(u => u.nombre === nombre);
}

function confirmarOpcion() {
    return parseInt(prompt("¿Desea guardar su respuesta?\n1. Sí\n0. No, repetir"));
}

export { Usuario, agregarUsuario, obtenerUsuarios, buscarUsuarioPorNombre, confirmarOpcion };
