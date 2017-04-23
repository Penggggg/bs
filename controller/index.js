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
var invite_member_1 = require("./project/invite-member");
var create_project_1 = require("./project/create-project");
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
    /**用户模块：查询所有符合条件的用户 */
    router.post('/api/v1/all-user', query_controller_1.fetchAllUserByName);
    /**消息模块：查询所有符合条件的消息 */
    router.post('/api/v1/msg-list', query_msg_1.fetchAllMsgList);
    /**消息模块：所有消息的伪查询 */
    router.post('/api/v1/msg-list-fade', query_msg_1.fetchFadeMsgList);
    /**消息模块 */
    router.get('/api/v1/msg-detail/:_id', query_msg_1.fetchMsgDetail);
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
