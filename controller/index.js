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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var login_1 = require("./auth/login");
var reset_1 = require("./auth/reset");
var signin_1 = require("./auth/signin");
var add_chat_1 = require("./project/chat/add-chat");
var add_task_1 = require("./project/task/add-task");
var add_group_1 = require("./project/group/add-group");
var invite_member_1 = require("./project/invite-member");
var add_schedules_1 = require("./project/schedules/add-schedules");
var query_chat_1 = require("./project/chat/query-chat");
var update_task_1 = require("./project/task/update-task");
var query_task_1 = require("./project/task/query-task");
var add_child_task_1 = require("./project/task/add-child-task");
var update_child_task_1 = require("./project/task/update-child-task");
var create_project_1 = require("./project/create-project");
var reply_invite_1 = require("./project/reply-invite");
var changeInfo_controller_1 = require("./user/changeInfo.controller");
var query_1 = require("./project/schedules/query");
var query_group_1 = require("./project/group/query-group");
var add_task_talk_1 = require("./project/task/add-task-talk");
var files_1 = require("./project/files");
var query_controller_1 = require("./user/query.controller");
var query_project_1 = require("./project/query-project");
var query_msg_1 = require("./msg/query-msg");
exports.default = function (router) {
    /**首页 */
    router.get('/', getIndex);
    /**权限模块：注册功能 */
    router.post('/api/v1/login', login_1.login);
    /**权限模块：重置密码功能 */
    router.post('/api/v1/resetpsw', reset_1.resetPsw);
    /**权限模块：登录功能 */
    router.post('/api/v1/signin', signin_1.sginIn);
    /**项目模块：新增项目 */
    router.post('/api/v1/create-project', create_project_1.createProject);
    /**项目模块：返回所有项目 */
    router.get('/api/v1/all-project', query_project_1.allProject);
    /**项目模块：返回项目详情 */
    router.get('/api/v1/project/:id', query_project_1.projectDetail);
    /**项目模块：邀请成员 */
    router.post('/api/v1/invite-member', invite_member_1.inviteMember);
    /**项目模块：回应邀请 */
    router.post('/api/v1/reply-invite', reply_invite_1.replyInvite);
    /**项目模块：增加聊天记录 */
    router.post('/api/v1/chat-record', add_chat_1.addChat);
    /**项目模块：所有聊天记录 */
    router.get('/api/v1/chat-list', query_chat_1.getChatList);
    /**项目模块：新增分组 */
    router.post('/api/v1/add-group', add_group_1.addNewGroup);
    /**项目模块：查询分组 */
    router.get('/api/v1/all-group', query_group_1.allGroup$);
    /**项目模块：新增任务 */
    router.post('/api/v1/add-task', add_task_1.addTask);
    /**项目模块：查询任务 */
    router.get('/api/v1/task-detail', query_task_1.taskDetail$);
    /**项目模块：查询个人任务 */
    router.get('/api/v1/my-task', query_task_1.allUserTask$);
    /**项目模块：新增任务聊天 */
    router.post('/api/v1/add-task-talk', add_task_talk_1.addTaskTalk);
    /**项目模块：更新任务内容 */
    router.post('/api/v1/update-task-content', add_task_talk_1.updateTaskContent);
    /**项目模块：新增子任务 */
    router.post('/api/v1/add-child-task', add_child_task_1.addChildTask);
    /**项目模块：子任务状态更改 */
    router.post('/api/v1/update-child-task', update_child_task_1.updateChildTask);
    /**项目模块：任务截止日期更改 */
    router.post('/api/v1/update-deadline', update_task_1.updateDeadline);
    /**项目模块：任务优先级更改 */
    router.post('/api/v1/update-priority', update_task_1.updatePriority);
    /**项目模块：新增日程 */
    router.post('/api/v1/add-schedules', add_schedules_1.addSchedules);
    /**项目模块：所有日程 */
    router.get('/api/v1/all-schedules', query_1.allSchedules);
    /**用户模块：查询所有符合条件的用户 */
    router.post('/api/v1/all-user', query_controller_1.fetchAllUserByName);
    /**用户模块：查询项目下所有成员和组长 */
    router.get('/api/v1/all-member-leader', query_controller_1.allMemberInProject);
    /**用户模块：更改信息 */
    router.post('/api/v1/change-info', changeInfo_controller_1.changeUserInfo);
    /**用户模块：更改密码 */
    router.post('/api/v1/change-psw', changeInfo_controller_1.changeUserPsw);
    /**消息模块：查询所有符合条件的消息 */
    router.post('/api/v1/msg-list', query_msg_1.fetchAllMsgList);
    /**消息模块：所有消息的伪查询 */
    router.post('/api/v1/msg-list-fade', query_msg_1.fetchFadeMsgList);
    /**消息模块 */
    router.get('/api/v1/msg-detail', query_msg_1.fetchMsgDetail);
    /**文件模块：下载 */
    router.get('/api/v1/download', files_1.download);
    /**文件模块：上传 */
    router.post('/api/v1/upload/:pid/:uid', files_1.upload);
    /**文件模块：查询 */
    router.get('/api/v1/all-files', files_1.allFiles);
    /**文件模块：删除 */
    router.get('/api/v1/delete-file', files_1.deleteFile);
};
function getIndex(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var a;
        return __generator(this, function (_a) {
            a = fs.readFileSync('./dist/index.html', 'utf8');
            ctx.body = a;
            return [2 /*return*/];
        });
    });
}
