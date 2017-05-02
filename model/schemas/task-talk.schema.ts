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

TaskTalkSchema.pre('save', function( next ){
    this.createdTime = Date.now( );
    next( );
})

TaskTalkSchema.statics.mySave = function( args ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Tasktalk');
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