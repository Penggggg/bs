"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var msg_schema_1 = require("../schemas/msg.schema");
exports.default = Mongoose.model('Msg', msg_schema_1.MsgSchema);
