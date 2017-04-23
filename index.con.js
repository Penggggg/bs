"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CON;
(function (CON) {
    /**socket事件名称 */
    var socketEvent;
    (function (socketEvent) {
        socketEvent.signIn = 'signInUser';
        socketEvent.signOut = 'signOutUser';
        socketEvent.msg = 'msg';
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
