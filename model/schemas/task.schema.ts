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

TaskSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

TaskSchema.statics.customUpdate = function( query, fields ) {
    return new Promise(( resolve, reject ) => {
        this
            .update( query, fields )
            .exec(( err, data) =>  returnData( err, resolve, reject, data ))
    })
}


TaskSchema.statics.findOne$ = function( id ) {
    return new Promise(( resolve, reject ) => {
        this.find({ _id: id }, null, null )
            .populate({
                path: 'taskTalksID',
                select: 'content createdTime creatorID',
                populate: {
                    path: 'creatorID',
                    select: 'name'
                }
            })
            .populate({
                path: 'creatorID',
                select: 'name'
            })
            .populate({
                path: 'executorsID',
                select: 'name'
            })
            .populate({
                path: 'groupID',
                select: 'creatorID leadersID pid',
                populate: {
                    path: 'creatorID leadersID',
                    select: 'name'
                },
            })
            .exec(( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

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