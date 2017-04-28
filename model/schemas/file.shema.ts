import * as Mongoose from 'mongoose';

export let FileSchema = new Mongoose.Schema({
    fileName: String,
    pid: {
        ref: 'Project',
        type: Mongoose.Schema.Types.ObjectId
    },
    updatedTime: {
        type: Date,
        default: Date.now( )
    },
    uid: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId
    }
})


FileSchema.pre('save', function( next ){
    this.updatedTime = Date.now( );
    next( );
})


FileSchema.statics.save = function({ pid, uid, fileName }) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('File');
        new model({ pid, uid, fileName })
            .save(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

FileSchema.statics.myUpdate = function( fileName ) {
    return new Promise(( resolve, reject ) => {
        this
            .update({ fileName }, { updatedTime: (new Date( )).getTime( ) })
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

FileSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options )
            .populate('uid', 'name')
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
