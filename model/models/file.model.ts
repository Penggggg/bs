import * as Mongoose from 'mongoose';
import { FileSchema } from '../schemas/file.shema';

export let FileModel = Mongoose.model( 'File', FileSchema ) as any