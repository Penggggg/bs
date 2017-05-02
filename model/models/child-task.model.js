"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var child_task_schema_1 = require("../schemas/child-task.schema");
exports.ChildTaskModel = Mongoose.model('Childtask', child_task_schema_1.ChildTaskSchema);
