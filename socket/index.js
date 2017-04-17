"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
// io
//     .of('/chat')
//     .on('connection', function (socket) {
//         // socket.broadcast.emit('news', { hello: 'world' });
//         socket.join('dog')
//         socket.broadcast.in('dog').emit('news', { room: 'dog-1' });
//     });
var mySocket = (function () {
    function mySocket() {
        this.userSocket = new user_1.default();
    }
    mySocket.prototype.init = function (io) {
        this.userSocket.initIo(io);
    };
    return mySocket;
}());
exports.default = new mySocket();
