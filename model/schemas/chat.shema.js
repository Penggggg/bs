"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.ChatSchema = new Mongoose.Schema({
    pid: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    record: [{
            createdTime: {
                type: Date,
                default: Date.now()
            },
            uid: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String
        }]
});
exports.ChatSchema.statics.save = function (_a) {
    var _this = this;
    var pid = _a.pid, uid = _a.uid, content = _a.content;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Chat');
        new model({ pid: pid, record: { uid: uid, content: content, createdTime: (new Date()).getTime() } })
            .save(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.ChatSchema.statics.customFind = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.ChatSchema.statics.findAllWithPid$ = function (pid) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({ pid: pid })
            .populate('record.uid', 'name')
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.ChatSchema.statics.myUpdate = function (pid, record) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update({ pid: pid }, { record: record })
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
function returnData(err, resolve, reject, result) {
    if (err) {
        console.log("\u6570\u636E\u5E93\u67E5\u8BE2\u9519\u8BEF: " + err);
        reject(err);
    }
    resolve(result);
}
