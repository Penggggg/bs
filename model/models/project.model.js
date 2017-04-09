"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var project_schema_1 = require("../schemas/project.schema");
exports.default = Mongoose.model('Project', project_schema_1.PorjectSchema);
