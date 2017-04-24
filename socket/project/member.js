"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = require("../../index.con");
var Member = (function () {
    function Member(io) {
        this.io = io;
    }
    Member.prototype.broadcast = function (arg) {
        this.io.emit("" + index_con_1.CON.socketEvent.project.member, { msg: arg.msg, data: arg.data });
    };
    return Member;
}());
exports.Member = Member;
