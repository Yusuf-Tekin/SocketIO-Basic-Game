const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io")
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

io.on('connection',(socket) => {
    socket.on('userPosition',(data) => {
        let userPos = {
            x:data.x,
            y:data.y
        }
        io.emit('userPositionOnStarted',userPos)
    })

})
httpServer.listen(5000, () => {
    console.log('Sunucu başlatıldı...')
});