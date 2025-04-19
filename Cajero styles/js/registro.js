function registrarUsuario() {
  let tipoId = document.getElementById('tipoId').value;
  let numeroId = document.getElementById('numeroId').value;
  let usuario = document.getElementById('usuario').value;
  let correo = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;
  let confirmar = document.getElementById('confirmarContrasena').value;
  let saldo = Number("0")
  //La funcion inicia obteniendo los valores que ingresa el usuario en el formulario


  let idValido = app.verificarregistro(numeroId);//Defino variable registroValido y le asigno el valor que me devuelve el método
  let usuarioValido = app.verificarregistro2(usuario);//Defino variable registroValido y le asigno el valor que me devuelve el método
  let correoValido = app.verificarregistro3(correo);//Defino variable registroValido y le asigno el valor que me devuelve el método
  
  if (idValido) {/*Condicional para comparar si el registroValido tiene un valor para reconocerlo como true y por ende 
    indica que el usuario ya existe en el arreglo de objetos*/
    alert("El documento ya está en uso.");
    return false;
  }else if(usuarioValido){
    alert("El usuario ya está en uso")
    return false;
  }else if(correoValido){
    alert("El correo ya está en uso")
    return false;
  }else if (contrasena !== confirmar) {//Condicional para validar que la contraseña sea igual en ambos campos
    alert("Las contraseñas no coinciden.");
    return false;
  }

  let nuevoUsuario = {
    tipoId,
    numeroId,
    usuario,
    correo,
    contrasena,
    saldo
  };//Creo una variable para asignarle los atributos que me ingresa el usuario en el formulario de registro

  app.registrarUsuario(nuevoUsuario);//Ejecuto el método registrarUsuario para guardar en el arreglo de objetos toda la informacion del usuario
  alert("Usuario registrado con éxito");//Alerta para indicar que se registro el usuario
  limpiarCampos();//Función para dejar limpios los campos de registro
}

function limpiarCampos(){ /*Funcion para limpiar campos del registro */
  document.getElementById('tipoId').value="";
  document.getElementById('numeroId').value="";
  document.getElementById('usuario').value="";
  document.getElementById('correo').value="";
  document.getElementById('contrasena').value="";
  document.getElementById('confirmarContrasena').value="";
  }