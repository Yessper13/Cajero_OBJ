
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
}

