webpackJsonp([9],{

/***/ 1349:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDom = __webpack_require__(12);
var react_router_1 = __webpack_require__(152);
var pages_1 = __webpack_require__(537);
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super.call(this) || this;
    }
    App.prototype.render = function () {
        return React.createElement(react_router_1.Router, { routes: pages_1.default, history: react_router_1.hashHistory });
    };
    return App;
}(React.PureComponent));
ReactDom.render(React.createElement(App, null), document.querySelector('#app'));


/***/ }),

/***/ 1350:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var localStorageService = (function () {
    function localStorageService() {
        /**ls服务：配置key-value */
        this.setItem = function (key, value) {
            if (typeof value === 'string') {
                localStorage.setItem(key, value);
            }
            else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };
        /**ls服务：清空某项 */
        this.cleanItem = function (key) { return localStorage.removeItem(key); };
        /**ls服务：清空全部 */
        this.cleanAll = function () { return localStorage.clear(); };
    }
    /**ls服务：根据key获取value */
    localStorageService.prototype.getItem = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    return localStorageService;
}());
exports.default = new localStorageService();


/***/ }),

/***/ 1351:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketService = (function () {
    function socketService() {
        this.connectedUrl = 'http://localhost';
        this.connectedNameSpace = {};
    }
    socketService.prototype.connectNewNsp = function (name) {
        var socketClient = io(this.connectedUrl + "/" + name);
        this.connectedNameSpace[name] = socketClient;
        return socketClient;
    };
    socketService.prototype.disconnectNsp = function (name) {
        this.connectedNameSpace[name].disconnect();
        delete this.connectedNameSpace[name];
    };
    return socketService;
}());
exports.default = new socketService();


/***/ }),

/***/ 1352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(75);
var ProjectData = (function () {
    function ProjectData() {
    }
    ProjectData.prototype.save = function (project) {
        if (this.data$ === undefined) {
            this.init(project);
        }
        else {
            this.data$$.next(project);
        }
    };
    ProjectData.prototype.init = function (project) {
        var _this = this;
        var subject = new rxjs_1.ReplaySubject(1);
        var source = rxjs_1.Observable.create(function (observer) {
            _this.data$$ = observer;
            observer.next(project);
        });
        this.data$ = source.multicast(subject).refCount();
        this.data$.subscribe();
    };
    return ProjectData;
}());
exports.default = ProjectData;


/***/ }),

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(75);
var ProjecRole = (function () {
    function ProjecRole() {
    }
    ProjecRole.prototype.save = function (role) {
        if (this.data$ === undefined) {
            this.init(role);
        }
        else {
            this.data$$.next(role);
        }
    };
    ProjecRole.prototype.init = function (role) {
        var _this = this;
        var subject = new rxjs_1.ReplaySubject(1);
        var source = rxjs_1.Observable.create(function (observer) {
            _this.data$$ = observer;
            observer.next(role);
        });
        this.data$ = source.multicast(subject).refCount();
        this.data$.subscribe();
    };
    return ProjecRole;
}());
exports.default = ProjecRole;


/***/ }),

/***/ 1354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(75);
var UserData = (function () {
    function UserData() {
        var _this = this;
        this.save = function (user) {
            /**首次保存 */
            if (_this.userData$ === undefined) {
                _this.init(user);
            }
            else {
                _this.userData$$.next(user);
            }
        };
        this.init = function (user) {
            var subject = new rxjs_1.ReplaySubject(1);
            var source = rxjs_1.Observable.create(function (observer) {
                _this.userData$$ = observer;
                observer.next(user);
            });
            _this.userData$ = source.multicast(subject).refCount();
        };
    }
    return UserData;
}());
exports.default = UserData;


/***/ }),

/***/ 1355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var notification_service_1 = __webpack_require__(540);
var rxjs_1 = __webpack_require__(75);
var UserSignIn = (function () {
    function UserSignIn() {
        var _this = this;
        /**登录状态初始化 */
        this.initSignIn = function (target, eventName) {
            var source = rxjs_1.Observable
                .fromEvent(target, eventName)
                .map(function (res) { return res.status === '200' ? true : false; });
            var subject = new rxjs_1.ReplaySubject(1);
            _this.signIn$ = source.multicast(subject).refCount();
            _this.watchSignIn();
            _this.watchUserSocket(target, 'disconnect');
        };
        /**监控链接 */
        this.watchUserSocket = function (target, eventName) {
            _this.connectionSub = rxjs_1.Observable
                .fromEvent(target, eventName)
                .do(function () {
                notification_service_1.default.open({
                    title: '系统消息',
                    msg: 'socket服务已断开',
                    type: 'error'
                });
            })
                .subscribe();
        };
        /**监控登录 */
        this.watchSignIn = function () {
            _this.signInSub = _this.signIn$
                .do(function (isSign) {
                notification_service_1.default.open({
                    title: '系统消息',
                    msg: isSign ? 'socket链接成功' : 'socket服务链接失败',
                    type: 'ok'
                });
            })
                .subscribe();
        };
        /**取消登录监控 */
        this.cacelWatchSignIn = function () {
            _this.signInSub.unsubscribe();
            _this.connectionSub.unsubscribe();
        };
    }
    return UserSignIn;
}());
exports.default = UserSignIn;


/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auth_login_service_1 = __webpack_require__(538);
exports.default = {
    path: '/',
    getComponent: function (nextstate, cb) {
        __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 1359)).then(function (module) {
            cb(null, module.default);
        }).catch(function (err) { return showMessage(err, './app.page'); });
    },
    childRoutes: [
        {
            path: 'login',
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 1360)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './login.page'); });
            },
        }, {
            path: 'projects',
            onEnter: auth_login_service_1.default.requireLogin,
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 1363)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './project-all.page'); });
            }
        }, {
            path: 'project/:id',
            onEnter: auth_login_service_1.default.requireLogin,
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 1364)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './project.page'); });
            },
            childRoutes: [
                {
                    path: 'tasks',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 1367)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-tasks.page'); });
                    }
                },
                {
                    path: 'shares',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 1366)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-shares.page'); });
                    }
                },
                {
                    path: 'chats',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, 1361)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-chat.page'); });
                    }
                },
                {
                    path: 'files',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 1362)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-files.page'); });
                    }
                },
                {
                    path: 'schedules',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 1365)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-schedules.page'); });
                    }
                },
            ]
        }
    ]
};
function showMessage(err, pageName) {
    return console.error("Error in download " + pageName + ": " + err);
}


/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var local_storage_service_1 = __webpack_require__(1350);
var socket_service_1 = __webpack_require__(1351);
var user_1 = __webpack_require__(541);
var project_1 = __webpack_require__(539);
var authLoginService = (function () {
    function authLoginService() {
        var _this = this;
        this.signInName = 'user';
        this.loginUrl = '/login';
        this.socketNspSignIn = 'user';
        this.socketEventSignIn = 'signInUser';
        this.socketEventSignOut = 'signOutUser';
        this.myLocalStorage = local_storage_service_1.default;
        this.mySocket = socket_service_1.default;
        this.myUserStore = user_1.default;
        this.myProjectStore = project_1.default;
        /**auth服务：用户信息 */
        this.userData = function () { return _this.myLocalStorage.getItem(_this.signInName); };
        /**auth服务：检查是否已经登录 */
        this.isLogin = function () { return _this.myLocalStorage.getItem(_this.signInName) ? true : false; };
        /**auth登录服务：检查并重定向 */
        this.requireLogin = function (nextState, replace, next) {
            if (_this.isLogin()) {
                console.log("checking auth: \u5DF2\u767B\u5F55");
            }
            else {
                replace(_this.loginUrl);
                console.log("checking auth: \u672A\u767B\u5F55");
            }
            return next();
        };
        /**auth服务：登录 */
        this.signIn = function (user) {
            /**ls储存数据 */
            _this.myLocalStorage.setItem(_this.signInName, user);
            /**socket连接 */
            var a = _this.mySocket.connectNewNsp(_this.socketNspSignIn);
            a.emit("" + _this.socketEventSignIn, { user: user });
            /**rx监控 */
            _this.myUserStore.signIn.initSignIn(a, "" + _this.socketEventSignIn);
            /**rx存数据 */
            _this.myUserStore.data.save(user);
        };
        /**auth服务：登出 */
        this.signOut = function () {
            /**服务器登出 */
            var user = _this.myLocalStorage.getItem(_this.signInName);
            _this.mySocket.connectedNameSpace[_this.socketNspSignIn].emit("" + _this.socketEventSignOut, { user: user });
            /**本地登出 */
            _this.myLocalStorage.cleanItem(_this.signInName);
            _this.mySocket.disconnectNsp(_this.socketNspSignIn);
            /**rx取消监控 */
            _this.myUserStore.signIn.cacelWatchSignIn();
        };
    }
    return authLoginService;
}());
exports.default = new authLoginService();


/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var role_store_1 = __webpack_require__(1353);
var data_store_1 = __webpack_require__(1352);
var ProjectStore = (function () {
    function ProjectStore() {
        this.role = new role_store_1.default();
        this.data = new data_store_1.default();
    }
    return ProjectStore;
}());
exports.default = new ProjectStore();


/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(153);
var NotificationService = (function () {
    function NotificationService() {
    }
    NotificationService.prototype.open = function (_a) {
        var title = _a.title, msg = _a.msg, _b = _a.type, type = _b === void 0 ? 'ok' : _b;
        antd_1.notification.open({
            message: title,
            description: msg,
            icon: React.createElement(antd_1.Icon, { type: type === 'ok' ? "smile" : "frown", style: { color: '#108ee9' } }),
        });
    };
    return NotificationService;
}());
exports.default = new NotificationService();


/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var signIn_store_1 = __webpack_require__(1355);
var data_store_1 = __webpack_require__(1354);
var UserStore = (function () {
    function UserStore() {
        this.signIn = new signIn_store_1.default();
        this.data = new data_store_1.default();
    }
    return UserStore;
}());
exports.default = new UserStore();


/***/ })

},[1349]);