import * as Koa from 'koa';

import { TaskModel } from '../../../model/models/task.model';
import { GroupModel } from '../../../model/models/group.model';

export let addTask = async( ctx: Koa.Context ) => {

    let { creatorID, title, groupID, executorsID } = ctx.request.body as Partial<Schema.Task>;

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

    ctx.body = {
        data: 'ok'
    }

}