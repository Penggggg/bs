"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = require("../../index.con");
var Group = (function () {
    function Group(io) {
        this.io = io;
    }
    Group.prototype.broadcast = function () {
        this.io.emit("" + index_con_1.CON.socketEvent.project.group, {});
    };
    return Group;
}());
exports.Group = Group;
