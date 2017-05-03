import * as Koa from 'koa';


import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { GroupModel } from '../../../model/models/group.model';

export let updateDeadline = async( ctx: Koa.Context ) => {

    let { _id, deadLine } = ctx.request.body as API.Query.UpdateDeadline;

    /**更新task表 */    
    let save = await TaskModel.customUpdate({ _id }, { deadLine });

    /**查询task$ */
    let task$: Array<Schema.Task$> = await TaskModel.findOne$( _id );

    console.log( deadLine )
    console.log( task$[0].deadLine )

    let result: API.Res.UpdateDeadline = {
        data: task$[0],
        status: '200'
    }
    
    ctx.body = result;


}