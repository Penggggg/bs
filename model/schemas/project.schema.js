"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.PorjectSchema = new Mongoose.Schema({
    name: String,
    info: String,
    cover: String,
    creator: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    leader: [{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    member: [{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    meta: {
        createdTime: {
            type: Date,
            default: Date.now()
        },
        updatedTime: {
            type: Date,
            default: Date.now()
        }
    }
});
exports.PorjectSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdTime = this.meta.updatedTime = Date.now();
        this.cover = "/static/img/project-cover/" + getRanDom(6) + ".jpg";
    }
    else {
        this.meta.updatedTime = Date.now();
    }
    next();
});
exports.PorjectSchema.statics.customFind = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.PorjectSchema.statics.findAllWithRef = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({}, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.PorjectSchema.statics.findAllWithNest = function (select) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .find({}, ['name', 'info', 'cover', 'creator', 'leader', 'member'])
            .populate('creator', select)
            .populate('member', select)
            .populate('leader', select)
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.PorjectSchema.statics.findDetailByIdWithNest = function (id, select) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .find({ _id: id })
            .populate('creator', select)
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**更新项目member */
exports.PorjectSchema.statics.updateMember = function (id, member) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update({ _id: id }, { member: member })
            .populate('creator', '_id name phone')
            .populate('member', '_id name phone')
            .populate('leader', '_id name phone')
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**更新项目member后，查询最新数据 */
exports.PorjectSchema.statics.lastData = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .find({ _id: id })
            .populate('creator', '_id name phone')
            .populate('member', '_id name phone')
            .populate('leader', '_id name phone')
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.PorjectSchema.statics.save = function (name, info, userID) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Project');
        new model({ name: name, info: info, creator: userID })
            .save(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
function getRanDom(range) {
    return Math.floor(Math.random() * range);
}
function returnData(err, resolve, reject, result) {
    if (err) {
        console.log("\u6570\u636E\u5E93\u67E5\u8BE2\u9519\u8BEF: " + err);
        reject(err);
    }
    resolve(result);
}
