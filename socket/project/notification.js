"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = require("../../index.con");
var Notification = (function () {
    function Notification(io) {
        this.io = io;
    }
    Notification.prototype.broadcast = function (arg) {
        this.io.emit("" + index_con_1.CON.socketEvent.project.notification, __assign({}, arg));
    };
    return Notification;
}());
exports.Notification = Notification;
