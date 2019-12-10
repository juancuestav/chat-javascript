const socket = io();

//DOM
let nickname = document.getElementById('nickname');
let mensaje = document.getElementById('mensaje');
let entrar = document.getElementById('entrar');
let texto = document.getElementById('texto');
let enviar = document.getElementById('enviar');
let accion = document.getElementById('accion');
let archivo = document.getElementById('archivochat');
//let clickder = document.getElementById('clickder');

//------------------- Eventos
entrar.addEventListener('click', function() {
    socket.emit('unido', { nickname: nickname.value });
});

enviar.addEventListener('click', function() {
    socket.emit('texto', { nickname: nickname.value, texto: mensaje.value });
});

mensaje.addEventListener('keypress', function() {
    socket.emit('escribiendo', nickname.value);
});

archivo.addEventListener('click', function() {
    var file = archivo[0].files[0];
    var nombre = file.name;
    console.log(nombre);
    //socket.emit('archivo', nombre);
});

/*clickder.addEventListener('mousedown', function(ev) {
    if (ev.which == 3) { alert("Right mouse button clicked on element with id myId"); }
});*/

/*clickder.addEventListener('click', function(ev) {
    if (ev.which == 3) { 
});*/

//----------------------- ON
socket.on('unido', (data) => {
    accion.innerHTML = data.nickname + ' se ha unido al chat';
});

socket.on("texto", (data) => {
    accion.innerHTML = "";
    var imagen = "upload/juan.jpg";
    if (nickname.value == "Juan") {
        imagen = "upload/juan.jpg";
    } else if (nickname.value == "Bryan") {
        imagen = "upload/bryan.jpg";
    }
    if (nickname.value == "Jose") {
        imagen = "upload/jose.jpg";
    }
    texto.innerHTML += '<img src="' + imagen + '"><p id="clickder"><strong>' + data.nickname + '</strong>: ' + data.texto + '</p><br>';
    mensaje.value = "";
});

socket.on("escribiendo", data => {
    accion.innerHTML = "<strong>" + data + "</strong>" + ": <img src='img/escribiendo.gif'>"
});

socket.on("file", (data) => {
    accion.innerHTML = "";
    var imagen = "upload/juan.jpg";
    if (nickname.value == "Juan") {
        imagen = "upload/juan.jpg";
    } else if (nickname.value == "Bryan") {
        imagen = "upload/bryan.jpg";
    } else
    if (nickname.value == "Jose") {
        imagen = "upload/jose.jpg";
    }
    texto.innerHTML += '<img src="' + imagen + '"><p id="clickder"><strong>' + data.nickname + '</strong>: <a href="subirfile/' + data + '">' + data + '</a></p><br>';
    mensaje.value = "";
});

socket.on('archivo', (data) => {
    var texto = `${data.texto}`;
    $('#contenido').text(texto);
    console.log(`Archivo: ${data.nombre}`);
    console.log(`Contenido: ` + texto);
});