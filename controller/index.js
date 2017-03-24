"use strict";
var login_1 = require("./auth/login");
var reset_1 = require("./auth/reset");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (router) {
    /**权限模块：注册功能 */
    router.post('/api/v1/login', login_1.login);
    /**权限模块：重置密码功能 */
    router.post('/api/v1/resetpsw', reset_1.resetPsw);
};
