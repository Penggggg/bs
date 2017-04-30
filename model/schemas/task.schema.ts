import * as Mongoose from 'mongoose';

export let TaskSchema = new Mongoose.Schema({
    title: String,
    content: String,
    priority: Number,
    deadLine: String,
    finished: Boolean,
    groupID: {
        ref: 'Group',
        type: Mongoose.Schema.Types.ObjectId
    },
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    executorsID: [{
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    }],
    childTasksID: [{
        ref: 'Childtask',
        type: Mongoose.Schema.Types.ObjectId
    }],
    taskTalksID: [{
        ref: 'Tasktalk',
        type: Mongoose.Schema.Types.ObjectId
    }],
    createdTime: {
        type: Date,
        default: Date.now( )
    }
})

TaskSchema.pre('save', function( next ){
    this.createdTime = Date.now( );
    next( );
})