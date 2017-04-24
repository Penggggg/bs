"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectSocket = (function () {
    function ProjectSocket(io, pid) {
        console.log("--------project-socket\u542F\u52A8\u6210\u529F: " + pid);
        this.io = io;
        this.pid = pid;
        this.init(io, pid);
    }
    ProjectSocket.prototype.init = function (io, pid) {
        io
            .of("" + pid)
            .on('connection', function (socket) {
            console.log("\u6709\u4EBA\u8FDB\u5165\u4E86\u9879\u76EE" + pid);
        });
    };
    return ProjectSocket;
}());
exports.ProjectSocket = ProjectSocket;
