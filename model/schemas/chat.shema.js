"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.ChatSchema = new Mongoose.Schema({
    pid: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    record: [{
            createdTime: {
                type: Date,
                default: Date.now()
            },
            creator: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String
        }]
});
