import { Registro } from "./registro.js";
import { buscarUsuarioPorNombre } from "./usuario.js";
import { Opciones } from "./opcionesCuenta.js";

const registro = new Registro();
let login;
let usuarioActivo = null;

do {
    login = parseInt(prompt(" 1. Iniciar sesión \n 2. Registrar \n 0. Salir \n Elige respuesta (válida):"));

    switch (login) {
        case 1:
            const user = prompt("Ingresa tu nombre de usuario:");
            const pass = prompt("Ingresa tu contraseña:");
            const encontrado = buscarUsuarioPorNombre(user);

            if (encontrado && encontrado.Password === pass) {
                alert("¡Inicio de sesión exitoso!");
                usuarioActivo = encontrado;

                const opcion = Opciones(usuarioActivo, buscarUsuarioPorNombre);
                let optionsInside;
                do {
                    optionsInside = parseInt(prompt("¿Qué deseas realizar?\n 1. Transferencia \n 2. Retiro \n 3. Consulta de saldo \n 4. Cambio contraseña \n 5. Recarga saldo \n 6. Ver historial \n 0. Salir"));
                    switch (optionsInside) {
                        case 1: opcion.Transferencia(); break;
                        case 2: opcion.Retiro(); break;
                        case 3: opcion.ConsultaSaldo(); break;
                        case 4: opcion.CambioContraseña(); break;
                        case 5: opcion.RecargaSaldo(); break;
                        case 6: opcion.HistorialMovimientos(); break;
                        case 0: alert("Sesión finalizada"); break;
                        default: alert("Opción inválida");
                    }
                } while (optionsInside !== 0);

            } else {
                alert("Usuario o contraseña incorrectos.");
            }
            break;

        case 2:
            const nuevoRegistro = new Registro("", "", "", [], []);
            nuevoRegistro.iniciarRegistro();            
            alert(`Usuario registrado con éxito. Bienvenido, ${nuevoRegistro.User}`);
            break;
    }

} while (login !== 0);

alert("Programa finalizado.");
