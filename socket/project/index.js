"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_1 = require("./chat");
var file_1 = require("./file");
var group_1 = require("./group");
var member_1 = require("./member");
var index_con_1 = require("../../index.con");
var notification_1 = require("./notification");
var ProjectSocket = (function () {
    function ProjectSocket(io, pid) {
        console.log("--------project-socket\u542F\u52A8\u6210\u529F: " + pid);
        this.init(io, pid);
    }
    ProjectSocket.prototype.init = function (io, pid) {
        var _this = this;
        this.socket = io
            .of("" + pid);
        this.socket.on('connection', function (socket) {
            socket.emit("" + index_con_1.CON.socketEvent.project.getIn, { msg: '您已进入该项目的实时通讯频道' });
            /**事件通讯 */
            _this.member = new member_1.Member(_this.socket);
            _this.chat = new chat_1.Chat(_this.socket);
            _this.file = new file_1.File(_this.socket);
            _this.group = new group_1.Group(_this.socket);
            _this.notification = new notification_1.Notification(_this.socket);
        });
    };
    ProjectSocket.prototype.broadcast = function () {
    };
    return ProjectSocket;
}());
exports.ProjectSocket = ProjectSocket;
