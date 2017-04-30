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

TaskSchema.statics.mySave = function( args ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Task');
        new model({ ...args })
            .save(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`);
        reject( err )
    }
    resolve( result )
}