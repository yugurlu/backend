

var express = require("express")
var socket = require("socket.io")

var app = express()
var server = app.listen(3000)

const io = socket(server)

app.use(express.static("public"))

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("chat", data => {
        io.sockets.emit("chat", data)
    })

    socket.on("typing", data => {
        socket.broadcast.emit("typing", data)
    })
})
