import * as Mongoose from 'mongoose';

export let ScheduleSchema = new Mongoose.Schema({
    title: String,
    place: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    member: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    pid: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    createdTime: {
        type: Date,
        default: Date.now( )
    },
    creator: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


ScheduleSchema.pre('save', function( next ){
    this.updatedTime = Date.now( );
    next( );
})


ScheduleSchema.statics.save = function( arg ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Schedule');
        new model({ ...arg })
            .save(( err, data ) => returnData( err, resolve, reject, data ))
    })
}

ScheduleSchema.statics.customFind$ = function( query, field, option ) {
    return new Promise(( resolve, reject ) => {
        this.find( query, field, option )
            .populate({
                path: 'member',
                select: 'name'
            })
            .populate({
                path: 'creator',
                select: 'name'
            })
            .populate({
                path: 'pid',
                select: 'name'
            })
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