// Recupera el usuario activo del sessionStorage
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo")); // Obtiene el usuario activo del sessionStorage
const nombreUsuario = usuarioActivo.usuario;  // Recupera el nombre de usuario
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];// Recupera todos los usuarios del local storage
const indice = parseInt(sessionStorage.getItem("indiceUsuarioActivo"));// Me guarda el indice que ya encontre en la hoja iniciarsesion.js
const ahora = new Date(); //Guarda la hora 
const fechaHora = ahora.toLocaleString();//Trae la fecha 
let cuentas = usuarios[indice].cuentas;//Aqui guardo las cuentas que tiene el usuario , pueden ser 1 o 2 y su tipo
numeroCuentas = cuentas.length;//Obtengo el numero de cuentas que tiene el usuario actual
let indiceCuentaActual;
let cuentaUser;
//////////////////////////////////////////////////////////////////////////////////////
document.getElementById("nombre-cliente").textContent = `Bienvenido, ${nombreUsuario}`;
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    // Quitar clase 'active' de todas las pestañas y contenidos
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // Agregar clase 'active' al tab y contenido seleccionados
    tab.classList.add('active');
    document.querySelector(`.tab-content[data-content="${target}"]`).classList.add('active');
  });
});
//////////////////////////////////////////////////////////////////////////////////
function mostrarCuenta(botonCuenta){
  var cuentaActual = cuentas.find(cuenta => cuenta.tipoCuenta === botonCuenta)
  if (cuentaActual) {
    let indiceCuentaActual = cuentas.findIndex(cuenta => cuenta.tipoCuenta === botonCuenta);
    cuentaUser = (usuarios[indice].cuentas[indiceCuentaActual]);
    selectCuenta(indiceCuentaActual);
  } else {
    alert("No tienes creada esta cuenta aún");
  }
}
///////////////////////////////////////////////////////////////////
function selectCuenta(value) {//Aqui value es el valor de la posicion en el arreglo de cuentas, si es 0 o 1
  document.getElementById("saldo-actual").textContent = `$${usuarios[indice].cuentas[value].saldo.toFixed(2)}`;
  document.getElementById("tipo-cuenta").textContent = ` ${cuentaUser.tipoCuenta}`;
  document.getElementById("cuenta-actual").textContent = ` ${usuarios[indice].cuentas[value].nroCuenta}`;
}
////////////////////////////////////////////////////////////////////

function cerrarSesion() {
  window.location.href = "index.html";
}

function Transferencia(event) { // Función que se ejecuta al hacer una transferencia
  event.preventDefault();

  const usuarioDestino = document.getElementById("usuario").value; // Usuario destino
  const destino = Number(document.getElementById("cuenta").value); // Cuenta destino
  const montoT = Number(document.getElementById("valor").value); // Monto a transferir
  const clave = document.getElementById("clave").value; // Clave del usuario
  // verificacion de que haya una cuenta seleccionada
  if(!cuentaUser){
    alert("Seleccione primero una cuenta")
  }
  // Verificación de la clave
  if (clave !== usuarioActivo.contrasena) {
    alert("La clave ingresada es incorrecta.");
    return;
  }

  // Verificar si el destino es la misma cuenta
  if (usuarioDestino === nombreUsuario && destino === cuentaUser.nroCuenta) {
  alert("No puedes transferirte a la misma cuenta.");
  return;
  }


  // Validar monto
  if (isNaN(montoT) || montoT <= 0) {
    alert("Monto inválido.");
    return;
  }

  // Verificar saldo suficiente
  if (cuentaUser.saldo < montoT) {
    alert("Saldo insuficiente.");
    return;
  }

  // Buscar el usuario destino
  let destinoIndex = usuarios.findIndex(u => u.usuario === usuarioDestino);
  if (destinoIndex === -1) {
    alert("El usuario destino no existe.");
    return;
  }

  // Buscar la cuenta destino dentro del usuario encontrado 
  
  let indiceCuentaDestino = usuarios[destinoIndex].cuentas.findIndex(cuentas => cuentas.nroCuenta === destino);
  if (indiceCuentaDestino === -1) {
    alert("La cuenta destino no existe.");
    return;
  }

  // Obtener la fecha y hora de la transferencia
  const ahora = new Date();
  const fechaHora = ahora.toLocaleString();

  // Inicializar historial si no existe
  if (!cuentaUser.historial) cuentaUser.historial = [];
  if (!usuarios[destinoIndex].cuentas[indiceCuentaDestino].historial)
    usuarios[destinoIndex].cuentas[indiceCuentaDestino].historial = [];

  // Registrar la transferencia en el historial de ambas cuentas
  cuentaUser.historial.push(`-Transferencia de $${montoT.toFixed(2)} el ${fechaHora} a la cuenta ${usuarios[destinoIndex].cuentas[indiceCuentaDestino].nroCuenta}`);
  usuarios[destinoIndex].cuentas[indiceCuentaDestino].historial.push(
    `-Recibiste una transferencia de $${montoT.toFixed(2)} el ${fechaHora} desde la cuenta ${cuentaUser.nroCuenta}`
  );

  // Actualizar saldo
  cuentaUser.saldo -= montoT;
  usuarios[destinoIndex].cuentas[indiceCuentaDestino].saldo += montoT;

  // Guardar cambios en el array de usuarios
  usuarios[indice].cuentas[indiceCuentaActual] = cuentaUser;

  // Guardar en localStorage y sessionStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

  // Actualizar la interfaz
  document.getElementById("saldo-actual").textContent = `$${cuentaUser.saldo.toFixed(2)}`;
  document.getElementById("valor").value = "";
  document.getElementById("clave").value = "";
  document.getElementById("cuenta").value = "";

  alert("Transferencia realizada");
  location.reload(); // Recargar la página para reflejar los cambios
}

 
function RecargaSaldo(event) {
  event.preventDefault();

  const montoRecInput = Number(document.getElementById("montoRecarga").value);

  if (!cuentaUser) {
    alert("Primero selecciona una cuenta.");
    return;
  }

  if (!isNaN(montoRecInput) && montoRecInput > 0) {
    cuentaUser.saldo += montoRecInput;

    const fechaHora = new Date().toLocaleString();

    if (!cuentaUser.historial) cuentaUser.historial = [];
    cuentaUser.historial.push(`Recarga en la cuenta ${cuentaUser.tipoCuenta} de $${montoRecInput.toFixed(2)} el ${fechaHora}`);

    // Reemplazar cuenta actualizada directamente sin map
    usuarios[indice].cuentas[indiceCuentaActual] = cuentaUser;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indice]));

    document.getElementById("saldo-actual").textContent = `$${cuentaUser.saldo.toFixed(2)}`;
    document.getElementById("montoRecarga").value = "";
    alert("Saldo recargado correctamente.");
  } else {
    alert("Por favor, ingresa un monto válido.");
  }
}


function Retirar(event) {
  event.preventDefault();
  const montoRet = parseFloat(document.getElementById("montoRetiro").value)//Obtengo el input donde se ingresa el monto a retirar
  if (!isNaN(montoRet) && montoRet > 0 && montoRet % 10000 === 0 && cuentaUser.saldo >= montoRet) {
    if (usuarioActivo && !isNaN(indice)) {// Verifica que exista un usuario activo y un índice válido
      cuentaUser.saldo -= montoRet;// Sustrae el monto retirado al saldo actual del usuario
      if (!cuentaUser.historial) cuentaUser.historial = []; // crea el historial si no esta inicializado
      cuentaUser.historial.push(`Retiro de $${montoRet.toFixed(2)} el ${fechaHora}`);// Agrega una entrada al historial con el monto y la fecha de la recarga, se agrega toFixet para agregar 2 decimales
      usuarios[indice].cuentas[indiceCuentaActual] = cuentaUser;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));// Guarda la lista actualizada en localStorage
      sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
      document.getElementById("saldo-actual").textContent = `$${cuentaUser.saldo.toFixed(2)}`;// Actualiza el saldo en la interfaz del usuario
      
      montoRet.textContent = ""; //Limpia el campo de monto
      location.reload();
      alert("Saldo retirado");// Muestra mensaje de éxito
    } else {
      alert("Error: sesión no válida.");// Muestra mensaje de error si no hay sesión válida
    }
  } else {
    alert("Por favor, ingresa un monto válido.");// Muestra mensaje si el monto no es válido
  }
  document.getElementById("montoRetiro").value = "";

}

function HistorialMovimientos() {
  const listaHistorial = document.getElementById("lista-historial");
  listaHistorial.innerHTML = "";
  if (cuentaUser && cuentaUser.historial && cuentaUser.historial.length > 0) {
    cuentaUser.historial.forEach(mov => {
      const li = document.createElement("li");
      li.textContent = mov;
      listaHistorial.appendChild(li);
    });
  } 
  else {
    const li = document.createElement("li");
    li.textContent = "No hay movimientos registrados.";
    listaHistorial.appendChild(li);
  }
  return true;
}

function cargarPerfil() {
  mostrarDiv(); // Muestra el div del perfil y oculta/activa botones relacionados con contraseña
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo")); // Obtiene y parsea el objeto 'usuarioActivo' del sessionStorage

  if (usuarioActivo) {
    document.getElementById("cuenta-perfil").value = usuarioActivo.usuario || ''; // Asigna el nombre de usuario al input 'cuenta-perfil'
    document.getElementById("identificacion-perfil").value = `${usuarioActivo.tipoId}: ${usuarioActivo.numeroId}`; // Muestra el tipo y número de identificación
    document.getElementById("correo-perfil").value = usuarioActivo.correo || ''; // Asigna el correo al input 'correo-perfil'
  } else {
    alert("No se pudo cargar la información del perfil."); // Muestra alerta si no hay datos del perfil
  }
}

function mostrarDiv() {
  var div = document.querySelector('div[data-content="5"]').style.display = "block"; // Muestra el div de perfil (data-content="5")
  document.querySelector(".cambiar-contrasena").style.display = "none"; // Oculta el div donde se encuentra el campo para cambiar la contraseña
  document.querySelector(".boton-cambioC").style.display = "block"; // Muestra el botón de cambiar contraseña, al dar clic, va a mostrar el campo para cambiar la contraseña
  document.querySelector(".boton-continuar").style.display = "none"; // Oculta el botón de continuar
}

function cerrarC() {
  var divPerfil = document.querySelector('div[data-content="5"]');
  if (divPerfil) divPerfil.style.display = "none";

  var cambiarContrasena = document.querySelector(".cambiar-contrasena");
  if (cambiarContrasena) cambiarContrasena.style.display = "none";

}

function cerrar(event) {
  

  // Identificar la pestaña que se clickeó
  const clickedTab = event?.target?.getAttribute("data-tab");

  // Quitar 'active' de todas las pestañas y contenidos
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

}

function mostrar_div_contrasena() {
  document.querySelector(".cambiar-contrasena").style.display = "block"; // Muestra el campo para cambiar la contraseña
  document.querySelector(".boton-cambioC").style.display = "none"; // Oculta el botón de cambiar contraseña
  document.querySelector(".boton-continuar").style.display = "block"; // Muestra el botón de continuar el cual ejecuta actualizarContrasena()
}

function actualizarContrasena() {

  const nuevaClave = document.getElementById("nuevaClave").value.trim();
  const confirmarClave = document.getElementById("confirmarClave").value.trim();

  if (!nuevaClave || !confirmarClave) {
    alert("Por favor, completa ambos campos de contraseña.");
    return;
  }

  if (nuevaClave !== confirmarClave) {
    alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
    return;
  }

  if (usuarioActivo) {
    usuarios[indice].contrasena = nuevaClave; // Simulando el cambio de contraseña
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guardando el nuevo usuario en localStorage

    alert("Contraseña actualizada exitosamente.");

    // Limpiar los campos
    document.getElementById("nuevaClave").value = "";
    document.getElementById("confirmarClave").value = "";
  } else {
    alert("No se encontró usuario activo.");
  }
  console.log(usuarios[indice].contrasena);
}
//ver la contraseña escrita en elos input de la contraseña
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}


document.querySelectorAll('.tab').forEach(tab => {

  tab.addEventListener('click', () => {
    
    const tabNum = tab.getAttribute('data-tab');
    // Solo permitir acceso libre a la pestaña 6 (crear cuenta) o si hay cuentas existentes
    if (numeroCuentas === 0 && tabNum !== "6" && cuentaActual===undefined) {
      alert("No tienes cuentas registradas. Por favor, crea una cuenta antes de continuar.");
      // Redirigir visualmente al tab 6
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      document.querySelector('.tab[data-tab="6"]').classList.add('active');
      document.querySelector('.tab-content[data-content="6"]').classList.add('active');
      return;
    }

    // Normal: activar el tab clickeado
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const content = document.querySelector(`.tab-content[data-content="${tabNum}"]`);
    if (content) content.classList.add('active');

    switch (tabNum) {
      case "4":
        HistorialMovimientos();
        break;
      case "5":
        cargarPerfil();
        break;
      default:
        break;
    }
  });
  
});

