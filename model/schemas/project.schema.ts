import * as Mongoose from 'mongoose';

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
    group: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Group'
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


PorjectSchema.statics.customFind = function( query, fields, options ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, fields, options, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

PorjectSchema.statics.findAllWithRef =  function( ) {
    return new Promise(( resolve, reject ) => {
        this.find({ }, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}


PorjectSchema.statics.findAllWithNest =  function( select ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ }, ['name', 'info', 'cover', 'creator', 'leader', 'member'])
            .populate('creator', select )
            .populate('member', select )
            .populate('leader', select )
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

PorjectSchema.statics.findDetailByIdWithNest = function( id, select ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ _id: id })
            .populate('creator', select )
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

/**更新项目所有group和leader */
PorjectSchema.statics.updateAllGroupAndLeader = function( id, newLeaders, newGroups ) {
    return new Promise(( resolve, reject ) => {
        this
            .update({ _id: id }, { leader: newLeaders, group: newGroups })
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}


/**查询项目所有group和leader */
PorjectSchema.statics.findAllGroupAndLeader = function( id ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ _id: id }, 'group leader name')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}


/**查询 all member and populte */
PorjectSchema.statics.allMember$ = function( pid ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ _id: pid })
            .populate('member', '_id name phone')
            .populate('leader', '_id name phone')
            .populate('creator', '_id name phone')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

/**更新项目member */
PorjectSchema.statics.updateMember = function( id, member ) {
    return new Promise(( resolve, reject ) => {
        this
            .update({ _id: id }, { member })
            .populate('creator', '_id name phone')
            .populate('member', '_id name phone')
            .populate('leader', '_id name phone')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

/**更新项目member后，查询最新数据 */
PorjectSchema.statics.lastData = function( id ) {
    return new Promise(( resolve, reject ) => {
        this
            .find({ _id: id })
            .populate('creator', '_id name phone')
            .populate('member', '_id name phone')
            .populate('leader', '_id name phone')
            .exec(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

PorjectSchema.statics.save = function( name, info, userID ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Project');
        new model({ name, info, creator: userID })
            .save(( err, data ) => returnData( err, resolve, reject, data ))
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