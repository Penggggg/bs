import * as Mongoose from 'mongoose';
import { PorjectSchema } from '../schemas/project.schema';

export default Mongoose.model( 'Project', PorjectSchema ) as any