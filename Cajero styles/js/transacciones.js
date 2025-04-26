
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));// Recupera el usuario activo desde sessionStorage
const nombreUsuario = usuarioActivo.usuario;// Recupera el nombre de usuario del usuario activo
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];// Recupera todos los usuarios desde localStorage (si no hay, se asigna un arreglo vacío)
const indice = parseInt(sessionStorage.getItem("indiceUsuarioActivo"));// Recupera el índice del usuario activo
const ahora = new Date();// Obtiene la fecha y hora actual en formato local legible
const fechaHora = ahora.toLocaleString();
document.getElementById("saldo-actual").textContent = `$${usuarios[indice].saldo.toFixed(2)}`;
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


function cerrarSesion() {
  window.location.href = "index.html"; 
}

function Transferencia(event){//Funcion que se ejecuta al hacer una transferencia
  event.preventDefault();
    const destino = document.getElementById("cuenta").value;
    const montoT = Number(document.getElementById("valor").value);
    const clave = document.getElementById("clave").value;
    if (clave !== usuarioActivo.contrasena){
        alert("La clave ingresada es incorrecta.");
      return;} 

    if (destino === usuarioActivo.usuario) {
      alert("No puedes transferirte a ti mismo.");
      return;
    }
  
    if (isNaN(montoT) || montoT <= 0) {
      alert("Monto inválido.");
      return;
    }
  
    if (usuarioActivo.saldo < montoT) {
      alert("Saldo insuficiente.");
      return;
    }
    if(clave == usuarioActivo.contrasena){
      if (destino != usuarioActivo.usuario && usuarioActivo.saldo >= montoT) {
        let destinoIndex = usuarios.findIndex(u => u.usuario == destino);
        if (destinoIndex === -1) {
          alert("El usuario destino no existe.");
          return;
        }
        if (!usuarioActivo.historial) usuarioActivo.historial = [];// Inicializa el historial si no existe
        if (!usuarios[destinoIndex].historial) usuarios[destinoIndex].historial = [];// Inicializa el historial en la cuenta destino si no existe
        usuarioActivo.historial.push(`Transferencia de $${montoT.toFixed(2)} el ${fechaHora} a la cuenta ${usuarios[destinoIndex].usuario}`);// Agrega una entrada al historial con el monto y la fecha de la transferencia, se agrega toFixet para agregar 2 decimales
        usuarios[destinoIndex].historial.push(`Recibiste una transferencia de $${montoT.toFixed(2)} el ${fechaHora} desde la cuenta ${usuarios[indice].usuario}`);// Agrega una entrada al historial con el monto y la fecha de la recepcion de la transferencia, se agrega toFixet para agregar 2 decimales
        usuarios[indice].saldo -= montoT;
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
        document.getElementById("saldo-actual").textContent = `$${usuarios[indice].saldo.toFixed(2)}`;// Actualiza el saldo en la interfaz del usuario
        usuarios[destinoIndex].saldo += montoT;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));// Guarda la lista actualizada en localStorage\
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
        usuarioActivo.historial.push(`Transferencia de $${montoT.toFixed(2)} el ${fechaHora}`);// Agrega una entrada al historial con el monto y la fecha de la recarga, se agrega toFixet para agregar 2 decimales
     
        document.getElementById("valor").value = "";
        document.getElementById("clave").value = "";
        document.getElementById("cuenta").value = "";
        
      alert("Transferencia realizada");// Muestra mensaje de éxito
      location.reload();

      }
  }
}

  

function RecargaSaldo(event) {// Función que se ejecuta al hacer una recarga de saldo
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  const montoRec = parseFloat(document.getElementById("montoRecarga").value);// Obtiene el input donde se ingresa el monto a recargar y se comvierte a decimal
  
  if (!isNaN(montoRec) && montoRec > 0) {// Verifica que el monto ingresado sea un número válido y mayor que 0

    if (usuarioActivo && !isNaN(indice)) {// Verifica que exista un usuario activo y un índice válido
      usuarioActivo.saldo += montoRec;// Suma el monto recargado al saldo actual del usuario
      
      

      if (!usuarioActivo.historial) usuarioActivo.historial = [];// Inicializa el historial si no existe
      usuarioActivo.historial.push(`Recarga de $${montoRec.toFixed(2)} el ${fechaHora}`);// Agrega una entrada al historial con el monto y la fecha de la recarga, se agrega toFixet para agregar 2 decimales
      usuarios[indice] = usuarioActivo;// Actualiza el usuario en la lista de usuarios
      localStorage.setItem("usuarios", JSON.stringify(usuarios));// Guarda la lista actualizada en localStorage
      sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
      document.getElementById("saldo-actual").textContent = `$${usuarioActivo.saldo.toFixed(2)}`;// Actualiza el saldo en la interfaz del usuario
      
      montoRec.textContent = ""; // L = ""; // Limpia el campo de monto
      alert("Saldo recargado");// Muestra mensaje de éxito
    } else {
      alert("Error: sesión no válida.");// Muestra mensaje de error si no hay sesión válida
    }
  } else {
    alert("Por favor, ingresa un monto válido.");// Muestra mensaje si el monto no es válido
  }
  document.getElementById("montoRecarga").value = "";
  location.reload();
}

function Retirar(event){
  event.preventDefault();
  const montoRet = parseFloat(document.getElementById("montoRetiro").value)//Obtengo el input donde se ingresa el monto a retirar
  if (!isNaN(montoRet) && montoRet > 0 && montoRet % 10000===0  && usuarioActivo.saldo>=montoRet){
    if (usuarioActivo && !isNaN(indice)) {// Verifica que exista un usuario activo y un índice válido
      usuarioActivo.saldo -= montoRet;// Sustrae el monto retirado al saldo actual del usuario
      if (!usuarioActivo.historial) usuarioActivo.historial = [];// Inicializa el historial si no existe
      usuarioActivo.historial.push(`Retiro de $${montoRet.toFixed(2)} el ${fechaHora}`);// Agrega una entrada al historial con el monto y la fecha de la recarga, se agrega toFixet para agregar 2 decimales
      usuarios[indice] = usuarioActivo;// Actualiza el usuario en la lista de usuarios
      localStorage.setItem("usuarios", JSON.stringify(usuarios));// Guarda la lista actualizada en localStorage
      sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
      document.getElementById("saldo-actual").textContent = `$${usuarioActivo.saldo.toFixed(2)}`;// Actualiza el saldo en la interfaz del usuario
      
      montoRet.textContent = ""; // L = ""; // Limpia el campo de monto
      location.reload();
      alert("Saldo retirado");// Muestra mensaje de éxito
    } else {
      alert("Error: sesión no válida.");// Muestra mensaje de error si no hay sesión válida
    }
  } else {
    alert("Por favor, ingresa un monto válido.");// Muestra mensaje si el monto no es válido
  }
  document.getElementById("montoRecarga").value = "";
 
}




function HistorialMovimientos() {
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

  const listaHistorial = document.getElementById("lista-historial");
  listaHistorial.innerHTML = "";

  if (usuarioActivo && usuarioActivo.historial && usuarioActivo.historial.length > 0) {
    usuarioActivo.historial.forEach(mov => {
      const li = document.createElement("li");
      li.textContent = mov;
      listaHistorial.appendChild(li);
    });
  } else {
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

function cerrar() {
  var div = document.querySelector('div[data-content="5"]').style.display = "none"; // Oculta el div de perfil (data-content="5")
  document.querySelector(".cambiar-contrasena").style.display = "none"; // Oculta la sección para cambiar la contraseña
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
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const tabNum = tab.getAttribute('data-tab');
    const content = document.querySelector(`.tab-content[data-content="${tabNum}"]`);
    content.classList.add('active');

    if (tabNum === "4") {
      HistorialMovimientos();
    } else if (tabNum === "5") {
      cargarPerfil();
    }
  });
});