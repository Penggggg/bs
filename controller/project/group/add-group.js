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
var index_con_1 = require("../../../index.con");
var socket_1 = require("../../../socket");
var msg_model_1 = require("../../../model/models/msg.model");
var group_model_1 = require("../../../model/models/group.model");
var project_model_1 = require("../../../model/models/project.model");
exports.addNewGroup = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var fromuid, touid, pid, groupName, saveGroup, oldProject, leader, group, box, newLeaders, newGroups, projectUpdate, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fromuid = (_a = ctx.request.body, _a.fromuid), touid = _a.touid, pid = _a.pid, groupName = _a.groupName;
                return [4 /*yield*/, group_model_1.GroupModel.mySave({
                        pid: pid,
                        groupName: groupName,
                        creatorID: fromuid,
                        leadersID: touid
                    })
                    /**2. 更新Porject表 */
                    /**2-0. 查询Project数据 */
                ];
            case 1:
                saveGroup = _c.sent();
                return [4 /*yield*/, project_model_1.default.findAllGroupAndLeader(pid)];
            case 2:
                oldProject = _c.sent();
                leader = (_b = oldProject[0], _b.leader), group = _b.group;
                box = [];
                touid.map(function (uid) {
                    if (!leader.find(function (leaderID) { return leaderID !== uid; })) {
                        box.push(uid);
                    }
                });
                newLeaders = leader.concat(box);
                newGroups = group.concat([saveGroup._id]);
                return [4 /*yield*/, project_model_1.default.updateAllGroupAndLeader(pid, newLeaders, newGroups)];
            case 3:
                projectUpdate = _c.sent();
                /**3. socket通知 */
                /**3-1. 项目namesapce通知：groups变更 */
                socket_1.default.projectSockets[pid].group.broadcast();
                /**3-2. group-leader通知 */
                touid.map(function (uid) { return __awaiter(_this, void 0, void 0, function () {
                    var model, data, userSocket, _id, content, title, readed, meta;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                /**1.消息保存到数据库 */
                                model = {
                                    fromUID: fromuid,
                                    toUID: uid,
                                    PID: pid,
                                    content: "\u60A8\u5DF2\u88AB\u5347\u4E3A\u3010" + oldProject[0].name + "\u3011\u7684\u3010" + groupName + "\u7EC4\u3011\u7EC4\u957F",
                                    type: 2 /* GroupLeader */,
                                    dirty: false,
                                    readed: false,
                                    title: '项目邀请',
                                    formType: 1 /* noForm */,
                                    replyURL: ''
                                };
                                return [4 /*yield*/, msg_model_1.default.save(model)];
                            case 1:
                                data = _a.sent();
                                userSocket = socket_1.default.userSocket;
                                /**2.用户在线：即时转发 */
                                if (userSocket.checkIsOnline(uid)) {
                                    console.log("\u7528\u6237\u5728\u7EBF\uFF0C\u51C6\u5907\u8F6C\u53D1");
                                    _id = data._id, content = data.content, title = data.title, readed = data.readed, meta = data.meta;
                                    userSocket.sendMsgTo(uid, {
                                        type: 2 /* GroupLeader */,
                                        eventName: "" + index_con_1.CON.socketEvent.msg,
                                        content: {
                                            _id: _id,
                                            content: content, title: title, readed: readed, meta: meta
                                        }
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                /**数据返回 */
                ctx.body = { status: '200' };
                return [2 /*return*/];
        }
    });
}); };
