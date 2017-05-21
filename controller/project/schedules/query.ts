
import * as Koa from 'koa';

import { ScheduleModel } from '../../../model/models/schedule.model';

export let allSchedules = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query;
    
    let data: Array<Schema.Schedule$> = await ScheduleModel.customFind$({ pid }, null, { sort: [{"_id": -1 }]} );


    /**3. 返回数据 */
    ctx.body = data

}