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
var socket_1 = require("../../../socket");
var chat_model_1 = require("../../../model/models/chat.model");
var user_model_1 = require("../../../model/models/user.model");
exports.addChat = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var pid, uid, content, data, oldRecord, newRecord, update, save, userData, sokData, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pid = (_a = ctx.request.body, _a.pid), uid = _a.uid, content = _a.content;
                return [4 /*yield*/, chat_model_1.default.customFind({ pid: pid }, null, null)];
            case 1:
                data = _b.sent();
                if (!(data.length !== 0)) return [3 /*break*/, 3];
                oldRecord = data[0].record;
                newRecord = oldRecord.concat([{
                        uid: uid,
                        content: content,
                        createdTime: (new Date()).getTime()
                    }]);
                return [4 /*yield*/, chat_model_1.default.myUpdate(pid, newRecord)];
            case 2:
                update = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, chat_model_1.default.save({ pid: pid, uid: uid, content: content })];
            case 4:
                save = _b.sent();
                _b.label = 5;
            case 5: return [4 /*yield*/, user_model_1.default.customFind({ _id: uid }, 'name', null)];
            case 6:
                userData = _b.sent();
                sokData = {
                    createdTime: "" + new Date(),
                    uid: uid, content: content,
                    userName: userData[0].name,
                };
                socket_1.default.projectSockets[pid].chat.broadcast(sokData);
                result = {
                    status: '200',
                    msg: 'success'
                };
                ctx.body = result;
                return [2 /*return*/];
        }
    });
}); };
