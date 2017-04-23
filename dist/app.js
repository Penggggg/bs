webpackJsonp([11],{

/***/ 1351:
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
/// <reference path="./index.d.tsx" />
var React = __webpack_require__(0);
var ReactDom = __webpack_require__(12);
var react_router_1 = __webpack_require__(152);
var pages_1 = __webpack_require__(540);
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

/***/ 1352:
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

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
var msg_1 = __webpack_require__(543);
var index_con_1 = __webpack_require__(154);
var notification_service_1 = __webpack_require__(239);
var Msg = (function () {
    function Msg() {
        var _this = this;
        this.watch = function (socket) {
            _this.sub = rxjs_1.Observable
                .fromEvent(socket, "" + index_con_1.CON.socketEvent.msg)
                .do(function (res) {
                /**获取最新数据 */
                msg_1.default.data.refresh();
                /**提示 */
                notification_service_1.default.open({
                    title: res.content.title,
                    msg: res.content.content
                });
            })
                .subscribe();
            setTimeout(function () { return msg_1.default.data.refresh(); }, 200);
        };
        this.cancelWatch = function () {
            _this.sub.unsubscribe();
        };
    }
    return Msg;
}());
exports.default = new Msg();


/***/ }),

/***/ 1354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var notification_service_1 = __webpack_require__(239);
var rxjs_1 = __webpack_require__(48);
var user_1 = __webpack_require__(238);
var index_con_1 = __webpack_require__(154);
var SignIn = (function () {
    function SignIn() {
        var _this = this;
        this.watch = function (socket) {
            _this.watchDisconnect(socket);
            _this.sub = rxjs_1.Observable
                .fromEvent(socket, "" + index_con_1.CON.socketEvent.signIn)
                .do(function (res) {
                user_1.default.signIn.save(res.status === '200' ? true : false);
            })
                .filter(function (res) { return res.status === '200'; })
                .do(function () {
                notification_service_1.default.open({
                    title: '系统消息',
                    msg: 'socket登录成功',
                    type: 'ok'
                });
            })
                .subscribe();
        };
        this.watchDisconnect = function (socket) {
            _this.sub2 = rxjs_1.Observable
                .fromEvent(socket, 'disconnect')
                .do(function () {
                notification_service_1.default.open({
                    title: '系统消息',
                    msg: 'socket服务已断开',
                    type: 'error'
                });
            })
                .subscribe();
        };
        this.cancelWatch = function () {
            _this.sub.unsubscribe();
            _this.sub2.unsubscribe();
        };
    }
    return SignIn;
}());
exports.default = new SignIn();


/***/ }),

/***/ 1355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var event_signIn_1 = __webpack_require__(1354);
var event_msg_1 = __webpack_require__(1353);
var socketService = (function () {
    function socketService() {
        this.SignIn = event_signIn_1.default;
        this.Msg = event_msg_1.default;
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

/***/ 1356:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
var user_1 = __webpack_require__(238);
var http_service_1 = __webpack_require__(1377);
var index_con_1 = __webpack_require__(154);
var MsgData = (function () {
    function MsgData() {
        var _this = this;
        this.save = function (msg) {
            _this.data$$.next(msg);
        };
        this.refresh = function () {
            var uid;
            var sub = user_1.default.data.userData$
                .do(function (user) { return uid = user._id; })
                .do(function () { return setTimeout(function () { return index_con_1.Util.cancelSubscribe(sub); }, 16); })
                .subscribe();
            http_service_1.default
                .post('/api/v1/msg-list-fade', { toUID: uid, readed: false, limit: 3, skip: 0 })
                .do(function (res) {
                _this.save({
                    total: res.count,
                    data: res.data
                });
            })
                .subscribe();
        };
        var subject = new rxjs_1.ReplaySubject(1);
        var source = rxjs_1.Observable.create(function (o) {
            _this.data$$ = o;
        }).startWith(null);
        this.data$ = source.multicast(subject).refCount();
        this.data$.subscribe();
    }
    return MsgData;
}());
exports.default = MsgData;


/***/ }),

/***/ 1357:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
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

/***/ 1358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
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

/***/ 1359:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
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
            _this.userData$.subscribe();
        };
    }
    return UserData;
}());
exports.default = UserData;


/***/ }),

/***/ 1360:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
var UserSignIn = (function () {
    function UserSignIn() {
        var _this = this;
        /**登录状态初始化 */
        this.initSignIn = function () {
            var source = rxjs_1.Observable.create(function (o) { _this.signIn$$ = o; });
            var subject = new rxjs_1.ReplaySubject(1);
            _this.signIn$ = source.multicast(subject).refCount();
            _this.signIn$.subscribe();
        };
        /**登录状态发射 */
        this.save = function (isSign) {
            if (_this.signIn$ === undefined) {
                _this.initSignIn();
            }
            _this.signIn$$.next(isSign);
        };
    }
    return UserSignIn;
}());
exports.default = UserSignIn;


/***/ }),

/***/ 1377:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(48);
var config_1 = __webpack_require__(1383);
var HttpService = (function () {
    function HttpService() {
        this.TIMEOUT = 10000;
    }
    HttpService.prototype.getXhr = function () {
        return new XMLHttpRequest();
    };
    HttpService.prototype.get = function (url, opt) {
        /**变量声明 */
        var data$$;
        var xhr = this.getXhr();
        /**数据源 */
        var data$ = rxjs_1.Observable.create(function (observer) {
            data$$ = observer;
        }).share();
        this.sub = data$.subscribe();
        /**异步事件设置 */
        this.decorateXHR(xhr, data$$);
        /**整合查询串 */
        url += "?" + this.turnObjToQuery(opt);
        /**开启xhr */
        xhr.open('GEt', "" + config_1.default.reqURL + url, true);
        xhr.send();
        console.info("sending http-GET: " + url);
        return data$;
    };
    HttpService.prototype.post = function (url, queryOpt) {
        /**变量声明 */
        var postBody;
        var data$$;
        var xhr = this.getXhr();
        /**数据源 */
        var data$ = rxjs_1.Observable.create(function (observer) {
            data$$ = observer;
        }).share();
        this.sub = data$.subscribe();
        /**异步事件设置 */
        this.decorateXHR(xhr, data$$);
        /**开启xhr */
        xhr.open('POST', "" + config_1.default.reqURL + url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        if (queryOpt) {
            xhr.send(JSON.stringify(queryOpt));
        }
        else {
            xhr.send();
        }
        console.info("sending http-POST: " + url);
        return data$;
    };
    HttpService.prototype.decorateXHR = function (xhr, data$$) {
        var _this = this;
        /**异步错误获取 */
        xhr.onerror = function (err) {
            data$$.error(err);
            _this.closeConnection(xhr, data$$);
        };
        /**超时设置 */
        xhr.timeout = this.TIMEOUT;
        xhr.ontimeout = function ($event) {
            data$$.error('http请求超时');
            _this.closeConnection(xhr, data$$);
        };
        /**异步状态判断 */
        xhr.onreadystatechange = function () {
            /**变量声明 */
            var readyState = xhr.readyState;
            var status = "" + xhr.status;
            /**准备就绪 */
            if (readyState === 4) {
                _this.sub.unsubscribe();
                /**成功：2**、3** */
                if (status.indexOf('2') === 0 || status.indexOf('3') === 0) {
                    var resObj = {};
                    try {
                        resObj = JSON.parse("" + xhr.responseText);
                        data$$.next(resObj);
                    }
                    catch (e) {
                        data$$.error(e);
                        data$$.complete();
                    }
                    /**客户端、服务端错误 */
                }
                else if (status.indexOf('4') === 0 || status.indexOf('0') === 0 || status.indexOf('5') === 0) {
                    data$$.error(status);
                    data$$.complete();
                }
                else {
                    data$$.error(status);
                    data$$.complete();
                }
            }
        };
    };
    HttpService.prototype.closeConnection = function (xhr, data$$) {
        xhr.abort();
        data$$.complete();
        this.sub.unsubscribe();
    };
    HttpService.prototype.setGetUrlWithQuery = function (url, query) {
        url += '?';
        Object.keys(query).map(function (key) {
            url += key + "=" + query[key] + "&";
        });
        return url.substring(0, url.length - 1);
    };
    HttpService.prototype.turnObjToQuery = function (query) {
        if (!query)
            return '';
        var body = '';
        Object.keys(query).map(function (key) {
            body += key + "=" + query[key] + "&";
        });
        return body;
    };
    return HttpService;
}());
exports.default = new HttpService();


/***/ }),

/***/ 1383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    reqURL:  true ? '' : ''
};


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var signIn_store_1 = __webpack_require__(1360);
var data_store_1 = __webpack_require__(1359);
var UserStore = (function () {
    function UserStore() {
        this.signIn = new signIn_store_1.default();
        this.data = new data_store_1.default();
    }
    return UserStore;
}());
exports.default = new UserStore();


/***/ }),

/***/ 239:
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

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auth_login_service_1 = __webpack_require__(542);
exports.default = {
    path: '/',
    getComponent: function (nextstate, cb) {
        __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 1364)).then(function (module) {
            cb(null, module.default);
        }).catch(function (err) { return showMessage(err, './app.page'); });
    },
    childRoutes: [
        {
            path: 'login',
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 1365)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './login.page'); });
            },
        }, {
            path: 'projects',
            onEnter: auth_login_service_1.default.requireLogin,
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 1370)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './project-all.page'); });
            }
        }, {
            path: 'project/:id',
            onEnter: auth_login_service_1.default.requireLogin,
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 1371)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './project.page'); });
            },
            childRoutes: [
                {
                    path: 'tasks',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 1374)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-tasks.page'); });
                    }
                },
                {
                    path: 'shares',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 1373)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-shares.page'); });
                    }
                },
                {
                    path: 'chats',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(10).then(__webpack_require__.bind(null, 1368)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-chat.page'); });
                    }
                },
                {
                    path: 'files',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(9).then(__webpack_require__.bind(null, 1369)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-files.page'); });
                    }
                },
                {
                    path: 'schedules',
                    onEnter: auth_login_service_1.default.requireLogin,
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, 1372)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './project-schedules.page'); });
                    }
                },
            ]
        }, {
            path: 'msgs',
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 1366)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './msg-all.page'); });
            },
            childRoutes: [
                {
                    path: ':id',
                    getComponent: function (nextstate, cb) {
                        __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 1367)).then(function (module) {
                            cb(null, module.default);
                        }).catch(function (err) { return showMessage(err, './msg-detail.page'); });
                    }
                }
            ]
        }
    ]
};
function showMessage(err, pageName) {
    return console.error("Error in download " + pageName + ": " + err);
}


/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var role_store_1 = __webpack_require__(1358);
var data_store_1 = __webpack_require__(1357);
var ProjectStore = (function () {
    function ProjectStore() {
        this.role = new role_store_1.default();
        this.data = new data_store_1.default();
    }
    return ProjectStore;
}());
exports.default = new ProjectStore();


/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = __webpack_require__(154);
var local_storage_service_1 = __webpack_require__(1352);
var socket_1 = __webpack_require__(1355);
var user_1 = __webpack_require__(238);
var project_1 = __webpack_require__(541);
var authLoginService = (function () {
    function authLoginService() {
        var _this = this;
        this.signInName = 'user';
        this.socketNspSignIn = 'user';
        this.myLocalStorage = local_storage_service_1.default;
        this.mySocket = socket_1.default;
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
                replace('/login');
                console.log("checking auth: \u672A\u767B\u5F55");
            }
            return next();
        };
        /**auth服务：登录 */
        this.signIn = function (user) {
            /**ls储存数据 */
            _this.myLocalStorage.setItem(_this.signInName, user);
            /**socket连接 */
            _this.connectedUserSocket = _this.mySocket.connectNewNsp(index_con_1.CON.socketNSP.user);
            _this.connectedUserSocket.emit("" + index_con_1.CON.socketEvent.signIn, { user: user });
            /**rx监控 */
            _this.mySocket.SignIn.watch(_this.connectedUserSocket);
            _this.mySocket.Msg.watch(_this.connectedUserSocket);
            /**rx存数据 */
            _this.myUserStore.data.save(user);
        };
        /**auth服务：登出 */
        this.signOut = function () {
            /**服务器登出 */
            var user = _this.myLocalStorage.getItem(_this.signInName);
            _this.mySocket.connectedNameSpace[index_con_1.CON.socketNSP.user].emit("" + index_con_1.CON.socketEvent.signOut, { user: user });
            /**本地登出 */
            _this.myLocalStorage.cleanItem(_this.signInName);
            _this.mySocket.disconnectNsp(index_con_1.CON.socketNSP.user);
            /**rx取消监控 */
            _this.mySocket.SignIn.cancelWatch();
            _this.mySocket.Msg.cancelWatch();
        };
    }
    return authLoginService;
}());
exports.default = new authLoginService();


/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var data_store_1 = __webpack_require__(1356);
var MsgStore = (function () {
    function MsgStore() {
        this.data = new data_store_1.default();
    }
    return MsgStore;
}());
exports.default = new MsgStore();


/***/ })

},[1351]);