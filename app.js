/// <reference path="index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var path = require("path");
var http = require("http");
var KoaRouter = require("koa-router");
var KoaBody = require("koa-bodyparser");
var KoaLog = require("koa-logs-full");
var Mongoose = require("mongoose");
var KoaServer = require("koa-static2");
var SocketIo = require("socket.io");
var controller_1 = require("./controller");
var socket_1 = require("./socket");
var node_config_1 = require("./config/node.config");
var app = new Koa();
var router = new KoaRouter();
var server = http.createServer(app.callback()).listen(node_config_1.appConfig.socketPort);
var io = SocketIo(server);
var db = Mongoose.connect(node_config_1.appConfig.dbIp + "/" + node_config_1.appConfig.dbTarget);
;
controller_1.default(router);
socket_1.default.init(io);
db.connection.on('error', function (e) {
    console.error("\u6570\u636E\u5E93\u8FDE\u63A5\u9519\u8BEF: " + e);
});
db.connection.on('open', function () {
    console.log("mongodb\u8FDE\u63A5\u6210\u529F: " + node_config_1.appConfig.dbTarget + "\u6570\u636E\u5E93");
});
app
    .use(KoaLog(app, {
    logdir: path.join(__dirname, 'logs')
}))
    .use(KoaServer("static", __dirname + '/dist'))
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(node_config_1.appConfig.nodePort);
console.log("app is running in " + node_config_1.appConfig.nodePort);
console.log("app's NODE_ENV is " + process.env.NODE_ENV);
