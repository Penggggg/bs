"use strict";
var user_1 = require("./user");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (io) {
    user_1.default.initIo(io);
    // io
    //     .of('/chat')
    //     .on('connection', function (socket) {
    //         // socket.broadcast.emit('news', { hello: 'world' });
    //         socket.join('dog')
    //         socket.broadcast.in('dog').emit('news', { room: 'dog-1' });
    //     });
};
