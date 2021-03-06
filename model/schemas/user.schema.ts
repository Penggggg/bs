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

UserSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

UserSchema.statics.findAll =  function( select ) {
    return new Promise(( resolve, reject ) => {
        this.find({ }, select, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

UserSchema.statics.findOneByID = function( id ) {
    return new Promise(( resolve, reject ) => {
        this.findOne({ _id: id }, ( err, data ) => returnData( err, resolve, reject, data ))
    })
}

UserSchema.statics.findOneByPhone = function( phone ) {
    return new Promise(( resolve, reject ) => {
        this.findOne({ phone }, ( err, data ) => returnData( err, resolve, reject, data ))
    })
}

UserSchema.statics.findAllByName = function( name, select ) {
    return new Promise(( resolve, reject ) => {
        let reg = new RegExp(name);
        this.find({ name: reg }, select,( err, data ) => returnData( err, resolve, reject, data ))
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

UserSchema.statics.updateInfo = function( _id, name, phone ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('User');
        model.update({ _id }, { name, phone }, ( err ) => returnData( err, resolve, reject ))
    })
}

UserSchema.statics.updatePsw2 = function( _id, newPassword ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('User');
        model.update({ _id }, { password: newPassword }, ( err ) => returnData( err, resolve, reject ))
    })
}

function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`);
        reject( err )
    }
    resolve( result )
}


