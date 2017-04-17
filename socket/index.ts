import userSocket from './user';


// io
//     .of('/chat')
//     .on('connection', function (socket) {
//         // socket.broadcast.emit('news', { hello: 'world' });
//         socket.join('dog')
//         socket.broadcast.in('dog').emit('news', { room: 'dog-1' });
//     });


class mySocket {

    public userSocket = new userSocket( );

    public init( io: SocketIO.Server ) {
        this.userSocket.initIo( io );
    }

}


export default new mySocket( );