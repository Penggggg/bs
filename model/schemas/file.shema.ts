import * as Mongoose from 'mongoose';

export let FileSchema = new Mongoose.Schema({
    size: String,
    fileName: String,
    pid: {
        ref: 'Project',
        type: Mongoose.Schema.Types.ObjectId
    },
    updatedTime: {
        type: Date,
        default: Date.now( )
    },
    creator: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    }
})


FileSchema.pre('save', function( next ){
    this.updatedTime = Date.now( );
    next( );
})