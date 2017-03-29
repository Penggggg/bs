

import userSocket from './user';

export default ( io: SocketIO.Server ) => {

    userSocket.initIo( io );
// io
//     .of('/chat')
//     .on('connection', function (socket) {
//         // socket.broadcast.emit('news', { hello: 'world' });
//         socket.join('dog')
//         socket.broadcast.in('dog').emit('news', { room: 'dog-1' });
//     });


}