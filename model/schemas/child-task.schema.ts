import * as Mongoose from 'mongoose';

export let ChildTaskSchema = new Mongoose.Schema({
    finished: Boolean,
    content: String,
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    taskID: {
        ref: 'Task',
        type: Mongoose.Schema.Types.ObjectId
    },
    createdTime: {
        type: Date,
        default: Date.now( )
    }
})

ChildTaskSchema.pre('save', function( next ){
    this.createdTime = Date.now( );
    next( );
})