"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = require("../../index.con");
var Schedule = (function () {
    function Schedule(io) {
        this.io = io;
    }
    Schedule.prototype.broadcast = function (arg) {
        this.io.emit("" + index_con_1.CON.socketEvent.project.schedule, arg);
    };
    return Schedule;
}());
exports.Schedule = Schedule;
