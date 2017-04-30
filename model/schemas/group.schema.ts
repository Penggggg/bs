import * as Mongoose from 'mongoose';

export let GroupSchema = new Mongoose.Schema({
    groupName: String,
    pid: {
        ref: 'Project',
        type: Mongoose.Schema.Types.ObjectId
    },
    creatorID: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    },
    leadersID: [{
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    }],
    tasksID: [{
        ref: 'Task',
        type: Mongoose.Schema.Types.ObjectId
    }]
})


GroupSchema.statics.mySave = function( arg ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Group');
        new model({ ...arg })
            .save(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

GroupSchema.statics.customFind$ = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options )
            .populate('leadersID', 'name _id')
            // .populate('tasksID', 'title content finished priority')
            .exec(( err, data) =>  returnData( err, resolve, reject, data ))
    })
}


function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`);
        reject( err )
    }
    resolve( result )
}