const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const fileUpload = require('express-fileupload');

// Inicializar
const app = express();
app.use(fileUpload());
app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
    console.log("Servidor escuchando en puerto: 3000");
});

const io = socketIO(server);

// static files
app.use(express.static(path.join(__dirname, "public")));

//Socket
io.on("connection", socket => {
    //console.log("Nueva conexion");
    socket.on("unido", data => {
        io.sockets.emit("unido", data);
    });

    socket.on("texto", data => {
        io.sockets.emit("texto", data);
    });

    socket.on("escribiendo", data => {
        socket.broadcast.emit("escribiendo", data);
    });

    socket.on("archivo", data => {
        console.log(data);
    });

    socket.on("file", data => {
        io.sockets.emit("file", data);
    });

    app.post('/subir', (req, res) => {
        let EDFile = req.files.file
        EDFile.mv(`./public/upload/${EDFile.name}`, err => {
            if (err) return res.status(500).send({ message: err })
            return res.status(200).redirect('index.html');
        });
    });

    app.post('/subirfile', (req, res) => {
        let EDFile = req.files.file
        EDFile.mv(`./public/subirfile/${EDFile.name}`, err => {
            if (err) return res.status(500).send({ message: err })
            console.log(EDFile.name);
            io.sockets.emit('file', EDFile.name);
            return res.status(200); //.redirect('index.html');
        });
    });

    app.get('/', (req, res) => {
        res.send('./public/index.html');

    });

});