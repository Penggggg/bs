"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
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
Object.defineProperty(exports, "__esModule", { value: true });
var index_con_1 = require("../../index.con");
var socket_1 = require("../../socket");
var msg_model_1 = require("../../model/models/msg.model");
exports.inviteMember = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var model, userSocket, fromUID, toUID, PID, content, type, data, _id, content_1, title, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userSocket = socket_1.default.userSocket;
                fromUID = (_a = ctx.request.body, _a.fromUID), toUID = _a.toUID, PID = _a.PID, content = _a.content, type = _a.type;
                /**1.消息保存到数据库 */
                model = {
                    fromUID: fromUID, toUID: toUID, PID: PID, content: content, type: type,
                    dirty: false,
                    readed: false,
                    title: '项目邀请',
                    formType: 1 /* InviteMember */,
                    replyURL: '/api/v1/reply-invite'
                };
                return [4 /*yield*/, msg_model_1.default.save(model)];
            case 1:
                data = _b.sent();
                /**2.用户在线：即时转发 */
                if (userSocket.checkIsOnline(toUID)) {
                    console.log("\u7528\u6237\u5728\u7EBF\uFF0C\u51C6\u5907\u8F6C\u53D1");
                    _id = data._id, content_1 = data.content, title = data.title;
                    userSocket.sendMsgTo(toUID, {
                        type: 1 /* InviteMember */,
                        eventName: "" + index_con_1.CON.socketEvent.msg,
                        content: {
                            msgId: _id,
                            content: content_1, title: title
                        }
                    });
                }
                result = {
                    msg: 'success',
                    status: '200'
                };
                ctx.body = result;
                return [2 /*return*/];
        }
    });
}); };
