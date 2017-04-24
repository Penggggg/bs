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
var msg_model_1 = require("../../model/models/msg.model");
var project_model_1 = require("../../model/models/project.model");
exports.replyInvite = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var result, answer, mid, msgData, projectData, msg, project, updateDirty, newMembers, updateMember, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                answer = (_a = ctx.request.body, _a.answer), mid = _a.mid;
                return [4 /*yield*/, msg_model_1.default.customFind({ _id: mid }, null, null)];
            case 1:
                msgData = _b.sent();
                return [4 /*yield*/, project_model_1.default.customFind({ _id: msgData[0].PID }, null, null)];
            case 2:
                projectData = _b.sent();
                msg = msgData[0];
                project = projectData[0];
                if (!msg.dirty) return [3 /*break*/, 3];
                result = {
                    msg: '提交无效，此前您已经选择过是否加入该项目',
                    status: '200'
                };
                return [2 /*return*/, ctx.body = result];
            case 3: return [4 /*yield*/, msg_model_1.default.updateDirty(mid)];
            case 4:
                updateDirty = _b.sent();
                /**2-1. 拒绝加入 */
                if (!answer) {
                    result = {
                        msg: '您已拒绝加入邀请',
                        status: '200'
                    };
                    return [2 /*return*/, ctx.body = result];
                }
                /**2-2-0. 检查项目成员、组长、boss */
                if (project.creator._id === msg.toUID) {
                    result = {
                        msg: '您已是该项目的负责任人',
                        status: '200'
                    };
                    return [2 /*return*/, ctx.body = result];
                }
                if (project.leader.find(function (leaderID) { return JSON.stringify(leaderID) === JSON.stringify(msg.toUID); })) {
                    result = {
                        msg: '您已是该项目的组长',
                        status: '200'
                    };
                    return [2 /*return*/, ctx.body = result];
                }
                if (project.member.find(function (uid) { return JSON.stringify(uid) === JSON.stringify(msg.toUID); })) {
                    result = {
                        msg: '您已是该项目的成员',
                        status: '200'
                    };
                    return [2 /*return*/, ctx.body = result];
                }
                newMembers = project.member.concat([msg.toUID]);
                return [4 /*yield*/, project_model_1.default.updateMember(project._id, newMembers)];
            case 5:
                updateMember = _b.sent();
                /**2-2-2. socket通告 */
                /**3. 返回数据 */
                result = {
                    msg: "\u6210\u529F\u52A0\u5165\u3010" + project.name + "\u3011\u9879\u76EE\uFF01",
                    status: '200'
                };
                ctx.body = result;
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
