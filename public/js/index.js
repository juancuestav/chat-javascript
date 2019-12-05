const socket = io();

//DOM
let nickname = document.getElementById('nickname');
let mensaje = document.getElementById('mensaje');
let entrar = document.getElementById('entrar');
let texto = document.getElementById('texto');
let enviar = document.getElementById('enviar');
let accion = document.getElementById('accion');
let archivo = document.getElementById('archivo');

entrar.addEventListener('click', function(){
    socket.emit('unido', {nickname: nickname.value});
});

enviar.addEventListener('click', function(){
    socket.emit('texto', {nickname:nickname.value, texto: mensaje.value});
});

mensaje.addEventListener('keypress', function(){
    socket.emit('escribiendo', nickname.value);
});

archivo.addEventListener('click', function(){
    var file = archivo[0].files[0];
    var nombre = file.name;
    socket.emit('archivo', nombre );
});

//-----------------------

socket.on('unido', (data) => {
    accion.innerHTML = data.nickname + ' se ha unido al chat';
});

socket.on("texto", (data) => {
    accion.innerHTML = "";
    texto.innerHTML += '<p><strong>' + data.nickname + '</strong>: ' + data.texto + '</p><br>';
    mensaje.value = "";
});

socket.on("escribiendo", data => {
    accion.innerHTML = "<strong>" + data + "</strong>" + ": <img src='img/escribiendo.gif'>"
});

socket.on('archivo', (data) => {
    var texto = `${data.texto}`;
    $('#contenido').text(texto);
    console.log(`Archivo: ${data.nombre}`);
    console.log(`Contenido: `+texto);
  });