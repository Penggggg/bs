import * as Mongoose from 'mongoose';

export let UserSchema = new Mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    meta: {
        createdTime: {
            type: Date,
            default: Date.now( )
        }, 
        updatedTime: {
            type: Date,
            default: Date.now( )          
        }
    }
})

UserSchema.pre('save', function( next ){
    if ( this.isNew ) {
        this.meta.createdTime = this.meta.updatedTime = Date.now( )
    } else {
        this.meta.updatedTime = Date.now( );
    }
    next( );
})

UserSchema.statics.findAll =  function( ) {
    return new Promise(( resolve, reject ) => {
        this.find({ }, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

UserSchema.statics.findOneByPhone = function( phone ) {
    return new Promise(( resolve, reject ) => {
        this.findOne({ phone }, ( err, data ) => returnData( err, resolve, reject, data ))
    })
}

UserSchema.statics.save = function( name, phone, password ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('User');
        new model({ name, phone, password })
            .save(( err ) => returnData( err, resolve, reject, { name, phone }))
    })
}

UserSchema.statics.updatePsw = function( phone, password ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('User');
        model.update({ phone }, { password }, ( err ) => returnData( err, resolve, reject ))
    })
}


function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`);
        reject( err )
    }
    resolve( result )
}


