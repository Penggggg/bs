"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var task_talk_schema_1 = require("../schemas/task-talk.schema");
exports.TaskTalkModel = Mongoose.model('Tasktalk', task_talk_schema_1.TaskTalkSchema);
