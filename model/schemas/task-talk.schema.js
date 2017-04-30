"use strict";
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
