
import * as Koa from 'koa';

import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { ChildTaskModel } from '../../../model/models/child-task.model';

export let updateChildTask = async( ctx: Koa.Context ) => {

    let { pid, finished, _id, taskID } = ctx.request.body as API.Query.UpdateChildTask;

    /**1. 更新child-task表 */
    let update = await ChildTaskModel.customUpdate({ _id }, { finished });

    /**2. 查询task$ */
    let task$: Array<Schema.Task$> = await TaskModel.findOne$( taskID );

    /**3. socket-group */
    mySocket.projectSockets[pid].group.broadcast( );


    /**返回 */
     let result: API.Res.AddChildTask = {
        data: task$[0],
        status: '200'
    }
    ctx.body = result;

}