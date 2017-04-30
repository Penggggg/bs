"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var task_schema_1 = require("../schemas/task.schema");
exports.TaskModel = Mongoose.model('Task', task_schema_1.TaskSchema);
