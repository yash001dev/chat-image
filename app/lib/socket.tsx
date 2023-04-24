import {Server} from 'socket.io';

const ioHandler= (req, res) => {
    if(!res.socket.server.io) {
        console.log('*First use, starting socket.io');

        const io = new Server(res.socket.server);
        io.on('connection', socket => {
            socket.broadcast.emit('a user connected');
            socket.on('disconnect', () => {
                socket.broadcast.emit('a user disconnected');
            })
        });
        res.socket.server.io = io;
    }
    res.end();
};

export default ioHandler;