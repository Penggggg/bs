webpackJsonp([2],{

/***/ 1346:
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
var react_router_1 = __webpack_require__(151);
var pages_1 = __webpack_require__(538);
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

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    path: '/',
    getComponent: function (nextstate, cb) {
        __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 1350)).then(function (module) {
            cb(null, module.default);
        }).catch(function (err) { return showMessage(err, './app.page'); });
    },
    childRoutes: [
        {
            path: 'login',
            getComponent: function (nextstate, cb) {
                __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 1351)).then(function (module) {
                    cb(null, module.default);
                }).catch(function (err) { return showMessage(err, './login.page'); });
            },
        }
    ]
};
function showMessage(err, pageName) {
    return console.error("Error in download " + pageName + ": " + err);
}


/***/ })

},[1346]);