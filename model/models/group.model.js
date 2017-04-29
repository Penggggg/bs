"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var group_schema_1 = require("../schemas/group.schema");
exports.GroupModel = Mongoose.model('Group', group_schema_1.GroupSchema);
