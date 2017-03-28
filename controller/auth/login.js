"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var util_1 = require("../util");
var user_model_1 = require("../../model/models/user.model");
/**用户注册 */
exports.login = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _a, userName, userPhone, password, password2, isExisted, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, userName = _a.userName, userPhone = _a.userPhone, password = _a.password, password2 = _a.password2;
                /**Ctx配置 */
                util_1.setCtx(ctx);
                /**检查密码配对情况 */
                if (password !== password2) {
                    console.log('正查询密码匹配情况');
                    return [2 /*return*/, ctx.body = JSON.stringify({
                            status: "" + 4001 /* PswNotEqual */,
                            msg: 'psw not equal'
                        })];
                }
                /**检查是否已存在 */
                console.log('正查询用户匹配情况');
                return [4 /*yield*/, user_model_1.default.findOneByPhone(userPhone)];
            case 1:
                isExisted = _b.sent();
                if (isExisted) {
                    return [2 /*return*/, ctx.body = JSON.stringify({
                            status: "" + 4002 /* UserExisted */,
                            msg: 'user has been existed'
                        })];
                }
                /**储存到数据库 */
                console.log('正把注册信息储存到数据库');
                return [4 /*yield*/, user_model_1.default.save(userName, userPhone, password)];
            case 2:
                result = _b.sent();
                /**返回 */
                return [2 /*return*/, ctx.body = JSON.stringify(Object.assign({
                        status: '200',
                        msg: 'success'
                    }, { user: result }))];
        }
    });
}); };
