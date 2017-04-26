"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CON;
(function (CON) {
    /**socket事件名称 */
    var socketEvent;
    (function (socketEvent) {
        /**登录 */
        socketEvent.signIn = 'signInUser';
        /**登出 */
        socketEvent.signOut = 'signOutUser';
        /**消息 */
        socketEvent.msg = 'msg';
        /**项目事件 */
        var project;
        (function (project) {
            /**进入项目 */
            project.getIn = 'getInProject';
            /**成员 */
            project.member = 'member';
            /**聊天信息 */
            project.chat = 'chat';
        })(project = socketEvent.project || (socketEvent.project = {}));
    })(socketEvent = CON.socketEvent || (CON.socketEvent = {}));
    /**socket命名空间 */
    var socketNSP;
    (function (socketNSP) {
        socketNSP.user = 'user';
    })(socketNSP = CON.socketNSP || (CON.socketNSP = {}));
})(CON = exports.CON || (exports.CON = {}));
var Util;
(function (Util) {
    Util.cancelSubscribe = function () {
        var subscritions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscritions[_i] = arguments[_i];
        }
        setTimeout(function () {
            subscritions.map(function (sub) {
                sub.unsubscribe();
            });
        }, 300);
    };
})(Util = exports.Util || (exports.Util = {}));
