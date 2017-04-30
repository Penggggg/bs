import * as Mongoose from 'mongoose';
import { TaskSchema } from '../schemas/task.schema';

export let TaskModel = Mongoose.model( 'Task', TaskSchema ) as any