import * as Mongoose from 'mongoose';
import { ChildTaskSchema } from '../schemas/child-task.schema';

export default Mongoose.model( 'Childtask', ChildTaskSchema ) as any