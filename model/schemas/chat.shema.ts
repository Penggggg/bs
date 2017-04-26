import * as Mongoose from 'mongoose';

export let ChatSchema = new Mongoose.Schema({
    pid: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    record: [{
        createdTime: {
            type: Date,
            default: Date.now( )
        },
        creator: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String
    }]
})

