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
exports.ScheduleSchema = new Mongoose.Schema({
    title: String,
    place: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    member: [{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    pid: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    createdTime: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.ScheduleSchema.pre('save', function (next) {
    this.updatedTime = Date.now();
    next();
});
exports.ScheduleSchema.statics.save = function (arg) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Schedule');
        new model(__assign({}, arg))
            .save(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.ScheduleSchema.statics.customFind$ = function (query, field, option) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, field, option)
            .populate({
            path: 'member',
            select: 'name'
        })
            .populate({
            path: 'creator',
            select: 'name'
        })
            .populate({
            path: 'pid',
            select: 'name'
        })
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
