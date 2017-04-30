"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.ChildTaskSchema = new Mongoose.Schema({
    finished: Boolean,
    content: String,
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    taskID: {
        ref: 'Task',
        type: Mongoose.Schema.Types.ObjectId
    },
    createdTime: {
        type: Date,
        default: Date.now()
    }
});
exports.ChildTaskSchema.pre('save', function (next) {
    this.createdTime = Date.now();
    next();
});
