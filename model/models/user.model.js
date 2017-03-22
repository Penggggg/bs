"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var user_schema_1 = require("../schemas/user.schema");
exports.default = Mongoose.model('User', user_schema_1.UserSchema);
