export default (io, socket) => {
    socket.on("comment", (data) => {
        io.emit("comment", data);
    });
    
}