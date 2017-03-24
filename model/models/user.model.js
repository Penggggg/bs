"use strict";
var Mongoose = require("mongoose");
var user_schema_1 = require("../schemas/user.schema");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mongoose.model('User', user_schema_1.UserSchema);
