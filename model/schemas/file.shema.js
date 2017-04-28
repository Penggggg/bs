"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.FileSchema = new Mongoose.Schema({
    fileName: String,
    pid: {
        ref: 'Project',
        type: Mongoose.Schema.Types.ObjectId
    },
    updatedTime: {
        type: Date,
        default: Date.now()
    },
    uid: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    }
});
exports.FileSchema.pre('save', function (next) {
    this.updatedTime = Date.now();
    next();
});
exports.FileSchema.statics.save = function (_a) {
    var _this = this;
    var pid = _a.pid, uid = _a.uid, fileName = _a.fileName;
    return new Promise(function (resolve, reject) {
        var model = _this.model('File');
        new model({ pid: pid, uid: uid, fileName: fileName })
            .save(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.FileSchema.statics.myUpdate = function (fileName) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update({ fileName: fileName }, { updatedTime: (new Date()).getTime() })
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.FileSchema.statics.customFind = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options)
            .populate('uid', 'name')
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
