class Cuenta {
    // Constructor que inicializa los atributos de la cuenta
    constructor(tipoCuenta, nroCuenta, saldo, historial = []) {
        this.tipoCuenta = tipoCuenta; // Tipo de cuenta: "Ahorros" o "Corriente"
        this.nroCuenta = nroCuenta;   // Número único asignado a la cuenta
        this.saldo = saldo;           // Saldo disponible en la cuenta
        this.historial = historial; // Lista de movimientos realizados
        
    }

    // Método estático para guardar una nueva cuenta
    static guardarCuenta(tipoCuenta) {
        const cuentas = Cuenta.obtenerCuentas(); // Obtener todas las cuentas existentes
        const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo")); // Obtener el usuario activo desde sessionStorage
        const indiceUsuario = sessionStorage.getItem("indiceUsuarioActivo"); // Obtener el índice del usuario activo

        // Verificar si hay un usuario activo
        if (usuarioActivo !== null && indiceUsuario !== null) {
            const usuarios = Usuario.obtenerUsuarios(); // Obtener la lista de usuarios

            // Si el usuario no tiene aún una lista de cuentas, se inicializa
            if (!usuarios[indiceUsuario].cuentas) {
                usuarios[indiceUsuario].cuentas = [];
            }

            // Verificar si el usuario ya tiene una cuenta del mismo tipo
            const cuentaCreada = usuarios[indiceUsuario].cuentas.some( // con .some() se verifica si existe al menos una cuenta que cumpla la condición
                cuenta => cuenta.tipoCuenta === tipoCuenta // Retorna true si existe una cuenta con el mismo tipo
            );

            // Si ya existe una cuenta del tipo, se muestra un mensaje y se detiene el proceso
            if (cuentaCreada) {
                alert(`Ya tienes una cuenta de tipo ${tipoCuenta}. Solo se permite una de cada tipo.`);
                return;
            }

            // Crear un nuevo número de cuenta secuencial
            const nroCuenta = Number(cuentas.length + 1);

            // Crear el objeto de la nueva cuenta
            const nuevaCuenta = {
                tipoCuenta: tipoCuenta,
                nroCuenta: nroCuenta,
                saldo: 0,
                historial: []
            };

            // Agregar la cuenta a la lista general y guardar en localStorage
            cuentas.push(nuevaCuenta);
            localStorage.setItem("cuentas", JSON.stringify(cuentas));

            // Asociar la cuenta al usuario actual
            usuarios[indiceUsuario].cuentas.push(nuevaCuenta);
            Usuario.guardarUsuarios(usuarios); // Guardar cambios en la lista de usuarios
            alert("Cuenta creada con éxito. Su número de cuenta es: " + nroCuenta);
            // Actualizar los datos del usuario activo en sessionStorage
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));
            location.reload
        } else {
            // Mostrar mensaje si no hay sesión iniciada
            alert("Debe iniciar sesión para crear una cuenta.");
        }
    }

    // Método para obtener todas las cuentas almacenadas
    static obtenerCuentas() {
        return JSON.parse(localStorage.getItem("cuentas")) || []; // Devuelve un array vacío si no hay cuentas
    }
}

// Función que se ejecuta al enviar el formulario para crear una cuenta
function crearCuenta() {
   // event.preventDefault(); // Evitar que el formulario recargue la página
    let tipoCuenta = document.getElementById("tipoCuenta").value; // Obtener el valor del campo tipoCuenta
    Cuenta.guardarCuenta(tipoCuenta); // Llamar al método para guardar la cuenta
    //cerrarSesion();
    
}
