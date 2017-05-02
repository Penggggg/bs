
import * as Mongoose from 'mongoose';
import { TaskTalkSchema } from '../schemas/task-talk.schema';

export let TaskTalkModel =  Mongoose.model( 'Tasktalk', TaskTalkSchema ) as any