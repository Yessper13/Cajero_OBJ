
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));// Recupera el usuario activo desde sessionStorage
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];// Recupera todos los usuarios desde localStorage (si no hay, se asigna un arreglo vacío)
const indice = parseInt(sessionStorage.getItem("indiceUsuarioActivo"));// Recupera el índice del usuario activo




document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
  if (usuarioActivo) {
    document.getElementById("saldo-actual").textContent = `$${usuarioActivo.saldo.toFixed(2)}`;
  }
});

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
    if(clave == usuarioActivo.contrasena){
      if (destino != usuarioActivo.usuario && usuarioActivo.saldo >= montoT) {
        let destinoT = usuarios.find(u => u.usuario == destino);
        usuarioActivo.saldo -= montoT;
        destinoT.saldo += montoT;

        //actualizar saldos en el local storange

        if (!usuarioActivo.historial) usuarioActivo.historial = [];// Inicializa el historial si no existe
          usuarioActivo.historial.push(`Transferencia de $${montoT.toFixed(2)} el ${fechaHora}`);// Agrega una entrada al historial con el monto y la fecha de la recarga, se agrega toFixet para agregar 2 decimales
          usuarios[indice] = usuarioActivo;// Actualiza el usuario en la lista de usuarios
          localStorage.setItem("usuarios", JSON.stringify(usuarios));// Guarda la lista actualizada en localStorage
          sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
          document.getElementById("saldo-actual").textContent = `$${usuarioActivo.saldo.toFixed(2)}`;// Actualiza el saldo en la interfaz del usuario
      
      montoRec.value = ""; // Limpia el campo de monto
      alert("Saldo recargado");// Muestra mensaje de éxito
        console.log(destinoT.saldo + destinoT.usuario)

      }
  }
}

  

function RecargaSaldo(event) {// Función que se ejecuta al hacer una recarga de saldo
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  const montoRec = parseFloat(document.getElementById("montoRecarga").value);// Obtiene el input donde se ingresa el monto a recargar y se comvierte a decimal
  
  if (!isNaN(montoRec) && montoRec > 0) {// Verifica que el monto ingresado sea un número válido y mayor que 0
    
    if (usuarioActivo && !isNaN(indice)) {// Verifica que exista un usuario activo y un índice válido
      usuarioActivo.saldo += montoRec;// Suma el monto recargado al saldo actual del usuario
      const ahora = new Date();// Obtiene la fecha y hora actual en formato local legible
      const fechaHora = ahora.toLocaleString();

      if (!usuarioActivo.historial) usuarioActivo.historial = [];// Inicializa el historial si no existe
      usuarioActivo.historial.push(`Recarga de $${montoRec.toFixed(2)} el ${fechaHora}`);// Agrega una entrada al historial con el monto y la fecha de la recarga, se agrega toFixet para agregar 2 decimales
      usuarios[indice] = usuarioActivo;// Actualiza el usuario en la lista de usuarios
      localStorage.setItem("usuarios", JSON.stringify(usuarios));// Guarda la lista actualizada en localStorage
      sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));// Actualiza también el usuario activo en sessionStorage
      document.getElementById("saldo-actual").textContent = `$${usuarioActivo.saldo.toFixed(2)}`;// Actualiza el saldo en la interfaz del usuario
      
      montoRec.value = ""; // Limpia el campo de monto
      alert("Saldo recargado");// Muestra mensaje de éxito
    } else {
      alert("Error: sesión no válida.");// Muestra mensaje de error si no hay sesión válida
    }
  } else {
    alert("Por favor, ingresa un monto válido.");// Muestra mensaje si el monto no es válido
  }
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