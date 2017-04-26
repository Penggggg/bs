import * as Mongoose from 'mongoose';
import { ChatSchema } from '../schemas/chat.shema';

export default Mongoose.model( 'Chat', ChatSchema ) as any