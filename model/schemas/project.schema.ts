import * as Mongoose from 'mongoose';
import UserModel from '../models/user.model';

export let PorjectSchema = new Mongoose.Schema({
    name: String,
    info: String,
    cover: String,
    creator: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    leader: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    member: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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


PorjectSchema.pre('save', function( next ){
    if ( this.isNew ) {
        this.meta.createdTime = this.meta.updatedTime = Date.now( );
        this.cover = `/static/img/project-cover/${getRanDom( 6 )}.jpg`;
    } else {
        this.meta.updatedTime = Date.now( );
    }
    next( );
})


PorjectSchema.statics.findAllWithRef =  function( ) {
    return new Promise(( resolve, reject ) => {
        this.find({ }, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}


PorjectSchema.statics.findAllWithNest =  function( ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ })
            .populate('creator')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}


PorjectSchema.statics.save = function( name, info, userID ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Project');
        new model({ name, info, creator: userID })
            .save(( err ) => returnData( err, resolve, reject ))
    })
}


function getRanDom ( range: number ) {
    return Math.floor(Math.random( ) * range )
}


function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`);
        reject( err )
    }
    resolve( result )
}