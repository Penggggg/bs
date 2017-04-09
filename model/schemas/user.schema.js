"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.UserSchema = new Mongoose.Schema({
    name: String,
    phone: String,
    password: String,
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
exports.UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdTime = this.meta.updatedTime = Date.now();
    }
    else {
        this.meta.updatedTime = Date.now();
    }
    next();
});
exports.UserSchema.statics.findAll = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({}, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.UserSchema.statics.findOneByPhone = function (phone) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.findOne({ phone: phone }, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.UserSchema.statics.save = function (name, phone, password) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('User');
        new model({ name: name, phone: phone, password: password })
            .save(function (err) { return returnData(err, resolve, reject, { name: name, phone: phone }); });
    });
};
exports.UserSchema.statics.updatePsw = function (phone, password) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('User');
        model.update({ phone: phone }, { password: password }, function (err) { return returnData(err, resolve, reject); });
    });
};
function returnData(err, resolve, reject, result) {
    if (err) {
        console.log("\u6570\u636E\u5E93\u67E5\u8BE2\u9519\u8BEF: " + err);
        reject(err);
    }
    resolve(result);
}
