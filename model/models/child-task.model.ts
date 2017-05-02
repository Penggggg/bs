import * as Mongoose from 'mongoose';
import { ChildTaskSchema } from '../schemas/child-task.schema';

export let ChildTaskModel =  Mongoose.model( 'Childtask', ChildTaskSchema ) as any