import * as Mongoose from 'mongoose';
import { UserSchema } from '../schemas/user.schema';

export default Mongoose.model( 'User', UserSchema ) as any