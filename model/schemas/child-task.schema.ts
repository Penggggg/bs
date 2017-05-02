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
    this.finished = false;
    this.createdTime = Date.now( );
    next( );
})

ChildTaskSchema.statics.customUpdate = function( query, fields ) {
    return new Promise(( resolve, reject ) => {
        this
            .update( query, fields )
            .exec(( err, data) =>  returnData( err, resolve, reject, data ))
    })
}


ChildTaskSchema.statics.mySave = function( args ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Childtask');
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