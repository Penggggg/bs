"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var file_shema_1 = require("../schemas/file.shema");
exports.FileModel = Mongoose.model('File', file_shema_1.FileSchema);
