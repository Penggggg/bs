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
var fs = require("fs");
var path = require("path");
var asyncBusboy = require("async-busboy");
var user_model_1 = require("../../model/models/user.model");
var file_model_1 = require("../../model/models/file.model");
exports.upload = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var pid, uid, files, fields, uploadFile, existdDir, mkdir, fileName, save, user, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                pid = (_a = ctx.params, _a.pid), uid = _a.uid;
                return [4 /*yield*/, asyncBusboy(ctx.req)];
            case 1:
                files = (_b = _c.sent(), _b.files), fields = _b.fields;
                uploadFile = files[0];
                return [4 /*yield*/, fs.existsSync("uploads/" + pid)];
            case 2:
                existdDir = _c.sent();
                if (!!existdDir) return [3 /*break*/, 4];
                return [4 /*yield*/, fs.mkdirSync("uploads/" + pid)];
            case 3:
                mkdir = _c.sent();
                _c.label = 4;
            case 4:
                uploadFile.setEncoding('utf8');
                fileName = uploadFile.filename;
                /**1. 上传到服务器 */
                uploadFile.pipe(fs.createWriteStream("uploads/" + pid + "/" + fileName));
                return [4 /*yield*/, file_model_1.FileModel.save({ pid: pid, uid: uid, fileName: fileName })];
            case 5:
                save = _c.sent();
                return [4 /*yield*/, user_model_1.default.customFind({ _id: uid }, 'name', null)];
            case 6:
                user = _c.sent();
                /**3. socket转发 */
                ctx.body = 'ok';
                return [2 /*return*/];
        }
    });
}); };
exports.download = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var fileName, filePath, stats, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = ctx.params.fileName;
                filePath = path.join(__dirname, '../files', fileName);
                stats = fs.statSync(filePath);
                if (!stats.isFile()) return [3 /*break*/, 2];
                ctx.set({
                    'Content-Disposition': "attachment; filename=" + fileName,
                    'Content-Length': "" + stats.size
                });
                return [4 /*yield*/, fs.readFileSync(filePath)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, ctx.body = data];
            case 2:
                ctx.body = '无可返回文件';
                return [2 /*return*/];
        }
    });
}); };
exports.allFiles = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var pid, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pid = ctx.query.pid;
                return [4 /*yield*/, file_model_1.FileModel.customFind({ pid: pid }, null, null)];
            case 1:
                data = _a.sent();
                ctx.body = data;
                return [2 /*return*/];
        }
    });
}); };
