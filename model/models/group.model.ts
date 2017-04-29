import * as Mongoose from 'mongoose';
import { GroupSchema } from '../schemas/group.schema';

export let GroupModel = Mongoose.model( 'Group', GroupSchema ) as any