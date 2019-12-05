const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

// Inicializar
const app = express();
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

});
