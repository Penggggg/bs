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
exports.TaskSchema = new Mongoose.Schema({
    title: String,
    content: String,
    priority: Number,
    deadLine: String,
    finished: Boolean,
    groupID: {
        ref: 'Group',
        type: Mongoose.Schema.Types.ObjectId
    },
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    executorsID: [{
            ref: 'User',
            type: Mongoose.Schema.Types.ObjectId
        }],
    childTasksID: [{
            ref: 'Childtask',
            type: Mongoose.Schema.Types.ObjectId
        }],
    taskTalksID: [{
            ref: 'Tasktalk',
            type: Mongoose.Schema.Types.ObjectId
        }],
    createdTime: {
        type: Date,
        default: Date.now()
    }
});
exports.TaskSchema.pre('save', function (next) {
    this.createdTime = Date.now();
    next();
});
exports.TaskSchema.statics.customFind = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.TaskSchema.statics.customUpdate = function (query, fields) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update(query, fields)
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.TaskSchema.statics.findOne$ = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({ _id: id }, null, null)
            .populate({
            path: 'taskTalksID',
            select: 'content createdTime creatorID',
            populate: {
                path: 'creatorID',
                select: 'name'
            }
        })
            .populate({
            path: 'creatorID',
            select: 'name'
        })
            .populate({
            path: 'executorsID',
            select: 'name'
        })
            .populate({
            path: 'groupID',
            select: 'creatorID leadersID pid',
            populate: {
                path: 'creatorID leadersID',
                select: 'name'
            },
        })
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.TaskSchema.statics.mySave = function (args) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Task');
        new model(__assign({}, args))
            .save(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
function returnData(err, resolve, reject, result) {
    if (err) {
        console.log("\u6570\u636E\u5E93\u67E5\u8BE2\u9519\u8BEF: " + err);
        reject(err);
    }
    resolve(result);
}
