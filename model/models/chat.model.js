"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var chat_shema_1 = require("../schemas/chat.shema");
exports.default = Mongoose.model('Chat', chat_shema_1.ChatSchema);
