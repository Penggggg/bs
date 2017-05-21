
import * as Koa from 'koa';

import mySocket from '../../../socket';
import { ScheduleModel } from '../../../model/models/schedule.model';

export let addSchedules = async( ctx: Koa.Context ) => {

    let { title, place, startDate, startTime, endDate, endTime, member, pid, uid } = ctx.request.body as API.Query.AddSchedule;

    /**1. 保存到数据库 */
    let save: Schema.Schedule = await ScheduleModel.save({
        title,
        place,
        startDate,
        startTime,
        endDate,
        endTime,
        pid,
        member,
        creator: uid
    } as Schema.Schedule )

    
    let data: Array<Schema.Schedule$> = await ScheduleModel.customFind$({ _id: save._id }, null, null );

    /**2. socket广播 */
    mySocket.projectSockets[pid].schedule.broadcast( data[0] );

    /**3. 返回数据 */
    ctx.body = {
        status: '200'
    }

}