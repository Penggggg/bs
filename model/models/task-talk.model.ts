
import * as Mongoose from 'mongoose';
import { TaskTalkSchema } from '../schemas/task-talk.schema';

export default Mongoose.model( 'Tasktalk', TaskTalkSchema ) as any