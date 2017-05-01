import * as Koa from 'koa';

import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { GroupModel } from '../../../model/models/group.model';

export let addTask = async( ctx: Koa.Context ) => {

    let { creatorID, title, groupID, executorsID, pid } = ctx.request.body as API.Query.AddNewTask;

    /**1. 保存到Task表 */
    let save: Schema.Task = await TaskModel.mySave({ creatorID, title, groupID, executorsID, 
            content: "",
            finished: false,
            priority: 0,
            deadLine: ''
    } as Partial<Schema.Task> );

    /**2. 更新group表 */

    /**2-1. 查询旧group */
    let oldGroup: Array<Schema.Group> = await GroupModel.customFind({ _id: groupID })

    /**2-2. 更新新数据 */
    let newTasksID = [ ...oldGroup[0].tasksID, save._id ];

    let update = await GroupModel.updateTasksID( groupID, newTasksID );

    /**3. socket通知 */

    /**3-1. namespace-group */
    mySocket.projectSockets[pid].group.broadcast( );

    /**3-2. socket通知 executorsID */
    executorsID.map(( exeID ) => {
        mySocket.projectSockets[pid].notification.broadcast({ msg: '您收到一条任务！'})
    })

    ctx.body = {
        status: '200'
    }

}