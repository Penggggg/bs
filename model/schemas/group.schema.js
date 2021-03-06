"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.GroupSchema = new Mongoose.Schema({
    groupName: String,
    pid: {
        ref: 'Project',
        type: Mongoose.Schema.Types.ObjectId
    },
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    leadersID: [{
            ref: 'User',
            type: Mongoose.Schema.Types.ObjectId
        }],
    tasksID: [{
            ref: 'Task',
            type: Mongoose.Schema.Types.ObjectId
        }]
});
/**新增分组 */
exports.GroupSchema.statics.mySave = function (arg) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Group');
        new model(__assign({}, arg))
            .save(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**自定义查询-populate */
exports.GroupSchema.statics.customFind$ = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options)
            .populate({
            path: 'leadersID',
            select: 'name'
        })
            .populate({
            path: 'tasksID',
            select: 'title finished priority executorsID childTasksID',
            populate: {
                path: 'executorsID childTasksID'
            }
        })
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**自定义查询 */
exports.GroupSchema.statics.customFind = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options)
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**更新tasksID */
exports.GroupSchema.statics.updateTasksID = function (id, tasksID) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update({ _id: id }, { tasksID: tasksID })
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
