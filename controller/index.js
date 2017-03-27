"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("./auth/login");
var reset_1 = require("./auth/reset");
var signin_1 = require("./auth/signin");
exports.default = function (router) {
    /**权限模块：注册功能 */
    router.post('/api/v1/login', login_1.login);
    /**权限模块：重置密码功能 */
    router.post('/api/v1/resetpsw', reset_1.resetPsw);
    /**权限模块：登录功能 */
    router.post('/api/v1/signin', signin_1.sginIn);
};
