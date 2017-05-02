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
exports.TaskTalkSchema = new Mongoose.Schema({
    content: String,
    taskID: {
        ref: 'Task',
        type: Mongoose.Schema.Types.ObjectId
    },
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    createdTime: {
        type: Date,
        default: Date.now()
    }
});
exports.TaskTalkSchema.pre('save', function (next) {
    this.createdTime = Date.now();
    next();
});
exports.TaskTalkSchema.statics.mySave = function (args) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Tasktalk');
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
