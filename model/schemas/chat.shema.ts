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
        uid: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String
    }]
})

ChatSchema.statics.save = function({ pid, uid, content }) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Chat');
        new model({ pid, record: { uid, content, createdTime: (new Date( )).getTime( )}})
            .save(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

ChatSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

ChatSchema.statics.findAllWithPid$ = function( pid ) {
    return new Promise(( resolve, reject ) => {
        this.find({ pid })
            .populate('record.uid', 'name')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

ChatSchema.statics.myUpdate = function( pid, record ) {
    return new Promise(( resolve, reject ) => {
        this
            .update({ pid }, { record })
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

