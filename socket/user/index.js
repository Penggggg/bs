"use strict";
var UserSocket = (function () {
    function UserSocket() {
        var _this = this;
        this.nameSpace = 'user';
        this.eventSignIn = 'signInUser';
        this.eventSignOut = 'signOutUser';
        this.userSockets = {};
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
                var user = _a.user;
                _this.userSockets[user.phone] = socket;
            });
            socket.emit("" + _this.eventSignIn, { msg: 'success',
                status: '200'
            });
        };
        /**登出 */
        this.signOut = function (socket) {
            socket.on("" + _this.eventSignOut, function (_a) {
                var user = _a.user;
                delete _this.userSockets[user.phone];
            });
            socket.on('disconnect', function () {
                console.log('disconnect');
            });
        };
    }
    return UserSocket;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new UserSocket();
