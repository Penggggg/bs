"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserSocket = (function () {
    function UserSocket() {
        var _this = this;
        this.nameSpace = 'user';
        this.eventSignIn = 'signInUser';
        this.eventSignOut = 'signOutUser';
        /**sid-socket */
        this.userSockets = {};
        /**电话-sid */
        this.userMapSid = {};
        /**初始化 */
        this.initIo = function (io) {
            io
                .of("" + _this.nameSpace)
                .on('connection', function (socket) {
                _this.signIn(socket);
                _this.signOut(socket);
            });
        };
        /**登录 */
        this.signIn = function (socket) {
            socket.on("" + _this.eventSignIn, function (_a) {
                var user = _a.user, sid = _a.sid;
                _this.userMapSid[user.phone] = sid;
                _this.userSockets[sid] = socket;
            });
            socket.emit("" + _this.eventSignIn, { msg: 'success',
                status: '200'
            });
        };
        /**登出 */
        this.signOut = function (socket) {
            socket.on("" + _this.eventSignOut, function (_a) {
                var user = _a.user;
                delete _this.userSockets[socket.id];
            });
            socket.on('disconnect', function () {
                console.log(socket.id + " is disconnect");
                delete _this.userSockets[socket.id];
                for (var _i = 0, _a = Object.keys(_this.userMapSid); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (socket.id === _this.userMapSid[key]) {
                        delete _this.userMapSid[key];
                    }
                }
            });
        };
    }
    return UserSocket;
}());
exports.default = new UserSocket();
