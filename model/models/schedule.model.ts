import * as Mongoose from 'mongoose';
import { ScheduleSchema } from '../schemas/schedule.shema';

export let ScheduleModel = Mongoose.model( 'Schedule', ScheduleSchema ) as any