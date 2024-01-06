const socketIO = require("socket.io");

var io = socketIO();

function init(server) {
    io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("A client connected");

        socket.on("disconnect", () => {
            console.log("A client disconnected");
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error("Socket.IO not initialized!");
    }
    return io;
}

module.exports = {
    init,
    getIO,
};
