import * as Koa from 'koa';


import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { GroupModel } from '../../../model/models/group.model';

export let updateDeadline = async( ctx: Koa.Context ) => {

    let { _id, deadLine, pid } = ctx.request.body as API.Query.UpdateDeadline;

    /**1. 更新task表 */    
    let save = await TaskModel.customUpdate({ _id }, { deadLine });

    /**2. 查询task$ */
    let task$: Array<Schema.Task$> = await TaskModel.findOne$( _id );

    /**3. socket-group */
    mySocket.projectSockets[pid].group.broadcast( );

    /**3. 返回数据 */
    let result: API.Res.UpdateDeadline = {
        data: task$[0],
        status: '200'
    }
    
    ctx.body = result;


}

export let updatePriority = async( ctx: Koa.Context ) => {

    let { _id, pid, priority } = ctx.request.body as API.Query.UpdatePriority;

    /**1. 更新task表 */
    let save = await TaskModel.customUpdate({ _id }, { priority });

    /**2. 查询TASk$ */
    let task$: Array<Schema.Task$> = await TaskModel.findOne$( _id );

    /**3. socket-group */
    mySocket.projectSockets[pid].group.broadcast( );

    /**4. 返回数据 */
    let result: API.Res.UpdateDeadline = {
        data: task$[0],
        status: '200'
    }
    
    ctx.body = result;

}