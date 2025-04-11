import { Usuario, agregarUsuario, confirmarOpcion } from "./usuario.js";

class Registro extends Usuario {
    constructor() {
        super("", "", ""); // Se sobreescribe luego
        this.tipoIdent = "";
        this.identify = 0;
    }

    iniciarRegistro() {
        this.seleccionarTipoIdentificacion();
        this.registrarIdentificacion();
        this.nombre = this.registrarUsuario();
        this.email = this.registrarEmail();
        this.password = this.ingresarContraseña();

        // Guarda el usuario en el array global
        agregarUsuario(this);

        alert(`✅ Registro exitoso. Bienvenido/a, ${this.nombre}`);
    }

    seleccionarTipoIdentificacion() {
        let tipoId = 0;
        do {
            tipoId = parseInt(prompt("Selecciona tu tipo de identificación:\n1. C.C\n2. T.I\n3. DNI"));

            switch (tipoId) {
                case 1: this.tipoIdent = "C.C"; break;
                case 2: this.tipoIdent = "T.I"; break;
                case 3: this.tipoIdent = "DNI"; break;
                default:
                    alert("⚠️ Opción no válida. Intenta de nuevo.");
            }
        } while (!this.tipoIdent || confirmarOpcion() !== 1);
    }

    registrarIdentificacion() {
        let repetir = false;

        do {
            repetir = false;
            const input = prompt(`Ingresa tu número de ${this.tipoIdent}:`);
            const id = parseInt(input);

            if (!isNaN(id) && id > 0) {
                alert("Identificación ingresada: " + id);
                if (confirmarOpcion() === 1) {
                    this.identify = id;
                } else {
                    repetir = true;
                }
            } else {
                alert("⚠️ Identificación no válida.");
                repetir = true;
            }
        } while (repetir);
    }

    registrarUsuario() {
        let nombre = "";
        let repetir = false;

        do {
            repetir = false;
            nombre = prompt("Ingresa tu nombre de usuario (ej. PROJAS):");

            if (nombre) {
                alert("Usuario ingresado: " + nombre);
                if (confirmarOpcion() !== 1) repetir = true;
            } else {
                alert("⚠️ Campo vacío.");
                repetir = true;
            }
        } while (repetir);

        return nombre;
    }

    registrarEmail() {
        let email = "";
        let repetir = false;

        do {
            repetir = false;
            email = prompt("Ingresa tu correo electrónico:");

            if (email && email.includes("@")) {
                alert("Correo ingresado: " + email);
                if (confirmarOpcion() !== 1) repetir = true;
            } else {
                alert("⚠️ Correo no válido.");
                repetir = true;
            }
        } while (repetir);

        return email;
    }

    ingresarContraseña() {
        let password = "";
        let repetir = false;

        do {
            repetir = false;
            const pass1 = prompt("Ingresa una contraseña de 4 dígitos:");
            const pass2 = prompt("Confirma la contraseña:");

            if (pass1 === pass2 && /^\d{4}$/.test(pass1)) {
                if (confirmarOpcion() === 1) {
                    password = pass1;
                } else {
                    repetir = true;
                }
            } else {
                alert("⚠️ Las contraseñas no coinciden o no tienen 4 dígitos.");
                repetir = true;
            }
        } while (repetir);

        return password;
    }
}

export { Registro };
