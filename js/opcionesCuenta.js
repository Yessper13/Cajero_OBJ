// opcionesCuenta.js
export function Opciones(usuarioActivo, buscarUsuarioPorNombre) {

    function Transferencia() {
        const destino = prompt("¿A quién deseas transferir?");
        const montoT = parseFloat(prompt("¿Cuánto deseas transferir?"));
        const usuarioDestino = buscarUsuarioPorNombre(destino);

        if (usuarioDestino && usuarioActivo.saldo >= montoT) {
            usuarioActivo.saldo -= montoT;
            usuarioDestino.saldo += montoT;
            usuarioActivo.agregarMovimiento(`Transferencia a ${destino} por $${montoT}`);
            usuarioDestino.agregarMovimiento(`Recibiste una transferencia de ${usuarioActivo.User} por $${montoT}`);
            alert("Transferencia exitosa");
        } else {
            alert("Transferencia no válida");
        }
    }

    function Retiro() {
        const montoR = parseFloat(prompt("¿Cuánto deseas retirar?"));
        if (usuarioActivo.saldo >= montoR) {
            usuarioActivo.saldo -= montoR;
            usuarioActivo.agregarMovimiento(`Retiro de $${montoR}`);
            alert("Retiro exitoso");
        } else {
            alert("Saldo insuficiente");
        }
    }

    function ConsultaSaldo() {
        alert(`Tu saldo es: $${usuarioActivo.saldo}`);
    }

    function CambioContraseña() {
        const nueva = prompt("Ingresa nueva contraseña:");
        usuarioActivo.Password = nueva;
        alert("Contraseña cambiada");
    }

    function RecargaSaldo() {
        const montoRec = parseFloat(prompt("¿Cuánto deseas recargar?"));
        usuarioActivo.saldo += montoRec;
        usuarioActivo.agregarMovimiento(`Recarga de $${montoRec}`);
        alert("Saldo recargado");
    }

    function HistorialMovimientos() {
        alert("Historial de movimientos:\n" + usuarioActivo.historial.join("\n"));
    }

    return {
        Transferencia,
        Retiro,
        ConsultaSaldo,
        CambioContraseña,
        RecargaSaldo,
        HistorialMovimientos
    };
}
