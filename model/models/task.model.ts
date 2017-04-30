import * as Mongoose from 'mongoose';
import { TaskSchema } from '../schemas/task.schema';

export default Mongoose.model( 'Task', TaskSchema ) as any