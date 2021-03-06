"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.MsgSchema = new Mongoose.Schema({
    type: String,
    fromUID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    toUID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    PID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    content: String,
    dirty: Boolean,
    readed: Boolean,
    title: String,
    formType: Number,
    replyURL: String,
    meta: {
        createdTime: {
            type: Date,
            default: Date.now()
        }
    }
});
exports.MsgSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdTime = this.meta.updatedTime = Date.now();
    }
    next();
});
exports.MsgSchema.statics.customFind = function (query, fields, options) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find(query, fields, options, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.MsgSchema.statics.findAll = function (select) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({}, select, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**更新readed为true，然后返回pupulated的Msg */
exports.MsgSchema.statics.updateReaded = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update({ _id: id }, { readed: true })
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
/**更新dirty为true */
exports.MsgSchema.statics.updateDirty = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .update({ _id: id }, { dirty: true })
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.MsgSchema.statics.findDetailById = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this
            .find({ _id: id })
            .populate('fromUID', 'name')
            .exec(function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.MsgSchema.statics.countAll = function (query) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.count(query, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.MsgSchema.statics.save = function (_a) {
    var _this = this;
    var fromUID = _a.fromUID, toUID = _a.toUID, type = _a.type, content = _a.content, PID = _a.PID, dirty = _a.dirty, readed = _a.readed, title = _a.title, formType = _a.formType, replyURL = _a.replyURL;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Msg');
        new model({ fromUID: fromUID, toUID: toUID, type: type, content: content, PID: PID, dirty: dirty, readed: readed, title: title, formType: formType, replyURL: replyURL })
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
