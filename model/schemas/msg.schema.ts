import * as Mongoose from 'mongoose';

export let MsgSchema = new Mongoose.Schema({
    type: String,
    fromUID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    toUID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    PID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    content: String,
    dirty: Boolean,
    readed: Boolean,
    title: String,
    formType: Number,
    replyURL: String,
    meta: {
        createdTime: {
            type: Date,
            default: Date.now( )
        }
    }
})

MsgSchema.pre('save', function( next ){
    if ( this.isNew ) {
        this.meta.createdTime = this.meta.updatedTime = Date.now( )
    }
    next( );
})

MsgSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

MsgSchema.statics.findAll =  function( select ) {
    return new Promise(( resolve, reject ) => {
        this.find({ }, select, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

/**更新readed为true，然后返回pupulated的Msg */
MsgSchema.statics.updateReaded = function( id ) {
    return new Promise(( resolve, reject ) => {
        this
            .update({ _id: id }, { readed: true })
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

MsgSchema.statics.findDetailById = function( id ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ _id: id })
            .populate('fromUID', 'name')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

MsgSchema.statics.countAll = function( query ) {
    return new Promise(( resolve, reject ) => {
        this.count( query, ( err, data ) => returnData( err, resolve, reject, data ))
    })
}

MsgSchema.statics.save = function({ fromUID, toUID, type, content, PID, dirty, readed, title, formType, replyURL }) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Msg');
        new model({ fromUID, toUID, type, content, PID, dirty, readed, title, formType, replyURL })
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