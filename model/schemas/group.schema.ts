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

/**新增分组 */
GroupSchema.statics.mySave = function( arg ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Group');
        new model({ ...arg })
            .save(( err, data ) => returnData( err, resolve, reject, data ))
    })
}


/**自定义查询-populate */
GroupSchema.statics.customFind$ = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options )
            .populate({
                path: 'leadersID',
                select: 'name'
            })
            .populate({
                path: 'tasksID',
                select: 'title finished priority executorsID childTasksID',
                populate: {
                    path: 'executorsID childTasksID'
                }
            })
            .exec(( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

/**自定义查询 */
GroupSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options )
            .exec(( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

/**更新tasksID */
GroupSchema.statics.updateTasksID = function( id, tasksID ) {
    return new Promise(( resolve, reject ) => {
        this
            .update({ _id: id }, { tasksID })
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}


function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`);
        reject( err )
    }
    resolve( result )
}