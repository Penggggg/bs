
import * as Koa from 'koa';

import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { ChildTaskModel } from '../../../model/models/child-task.model';

export let addChildTask = async( ctx: Koa.Context ) => {

    let { taskID, content, creatorID, pid } = ctx.request.body as API.Query.AddChildTask;

    /**1. 保存到child-task表 */
    let save: Schema.ChildTask = await ChildTaskModel.mySave({ taskID, content, creatorID })

    /**2. 更新task表 */
    let oldTask: Array<Partial<Schema.Task>> = await TaskModel.customFind({ _id: taskID }, 'childTasksID');
    let oldChildTasks = oldTask[0].childTasksID;
    let newChildTasks = [ ...oldChildTasks, save._id ];

    let update = await TaskModel.customUpdate({ _id: taskID }, { childTasksID: newChildTasks })

    /**3. 查询task$ */
    let task$: Array<Schema.Task$> = await TaskModel.findOne$( taskID );

    /**4. socket-group更新 */
    mySocket.projectSockets[pid].group.broadcast( );

    /**5. 返回数据 */
    let result: API.Res.AddChildTask = {
        data: task$[0],
        status: '200'
    }

    ctx.body = result
}