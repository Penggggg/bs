"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var user_model_1 = require("../models/user.model");
exports.PorjectSchema = new Mongoose.Schema({
    name: String,
    info: String,
    cover: String,
    creator: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: user_model_1.default
    },
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
exports.PorjectSchema.statics.findAllWithRef = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({}, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.PorjectSchema.statics.findAllWithNest = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var that = _this;
        _this
            .find({})
            .exec(function (err, data) {
            console.log(data);
        });
    });
};
exports.PorjectSchema.statics.save = function (name, info, userID) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Project');
        new model({ name: name, info: info, creator: userID })
            .save(function (err) { return returnData(err, resolve, reject); });
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