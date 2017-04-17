import * as Mongoose from 'mongoose';
import { MsgSchema } from '../schemas/msg.schema';

export default Mongoose.model( 'Msg', MsgSchema ) as any