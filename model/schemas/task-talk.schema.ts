import * as Mongoose from 'mongoose';

export let TaskTalkSchema = new Mongoose.Schema({

    content: String,
    taskID: {
        ref: 'Task',
        type: Mongoose.Schema.Types.ObjectId
    },
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    createdTime: {
        type: Date,
        default: Date.now( )
    }

})