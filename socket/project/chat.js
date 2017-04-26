"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = require("../../index.con");
var Chat = (function () {
    function Chat(io) {
        this.io = io;
    }
    Chat.prototype.broadcast = function (_a) {
        var uid = _a.uid, userName = _a.userName, content = _a.content;
        this.io.emit("" + index_con_1.CON.socketEvent.project.chat, { uid: uid, userName: userName, content: content });
    };
    return Chat;
}());
exports.Chat = Chat;
