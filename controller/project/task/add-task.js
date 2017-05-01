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
var task_model_1 = require("../../../model/models/task.model");
var group_model_1 = require("../../../model/models/group.model");
exports.addTask = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var creatorID, title, groupID, executorsID, pid, save, oldGroup, newTasksID, update, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                creatorID = (_a = ctx.request.body, _a.creatorID), title = _a.title, groupID = _a.groupID, executorsID = _a.executorsID, pid = _a.pid;
                return [4 /*yield*/, task_model_1.TaskModel.mySave({ creatorID: creatorID, title: title, groupID: groupID, executorsID: executorsID,
                        content: "",
                        finished: false,
                        priority: 0,
                        deadLine: ''
                    })];
            case 1:
                save = _b.sent();
                return [4 /*yield*/, group_model_1.GroupModel.customFind({ _id: groupID })
                    /**2-2. 更新新数据 */
                ];
            case 2:
                oldGroup = _b.sent();
                newTasksID = oldGroup[0].tasksID.concat([save._id]);
                return [4 /*yield*/, group_model_1.GroupModel.updateTasksID(groupID, newTasksID)];
            case 3:
                update = _b.sent();
                /**3. socket通知 */
                /**3-1. namespace-group */
                socket_1.default.projectSockets[pid].group.broadcast();
                /**3-2. socket通知 executorsID */
                executorsID.map(function (exeID) {
                    socket_1.default.projectSockets[pid].notification.broadcast({ msg: '您收到一条任务！' });
                });
                ctx.body = {
                    status: '200'
                };
                return [2 /*return*/];
        }
    });
}); };
