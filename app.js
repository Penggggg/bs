"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var path = require("path");
var KoaRouter = require("koa-router");
var KoaBody = require("koa-bodyparser");
var KoaLog = require("koa-logs-full");
var Mongoose = require("mongoose");
var controller_1 = require("./controller");
var node_config_1 = require("./config/node.config");
var app = new Koa();
var router = new KoaRouter();
var db = Mongoose.connect("mongodb://localhost/" + node_config_1.appConfig.dbTarget);
controller_1.default(router);
db.connection.on('error', function () {
    console.error('数据库连接错误:');
});
db.connection.on('open', function () {
    console.log("mongodb\u8FDE\u63A5\u6210\u529F: " + node_config_1.appConfig.dbTarget + "\u6570\u636E\u5E93");
});
app
    .use(KoaLog(app, {
    logdir: path.join(__dirname, 'logs')
}))
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(node_config_1.appConfig.nodePort);
console.log("app is running in " + node_config_1.appConfig.nodePort);
console.log("app's NODE_ENV is " + process.env.NODE_ENV);
