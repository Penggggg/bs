"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var schedule_shema_1 = require("../schemas/schedule.shema");
exports.ScheduleModel = Mongoose.model('Schedule', schedule_shema_1.ScheduleSchema);
