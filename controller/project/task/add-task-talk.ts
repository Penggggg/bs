import * as Koa from 'koa';

import { TaskModel } from '../../../model/models/task.model';
import { TaskTalkModel } from '../../../model/models/task-talk.model';

export let addTaskTalk = async( ctx: Koa.Context ) => {

    let { pid, content, creatorID, taskID } = ctx.request.body as API.Query.AddNewTaskTalk;

    /**1. 保存到task-talk表 */
    let save: Schema.TaskTalk = await TaskTalkModel.mySave({ content, creatorID, taskID });

    /**2. 更新task表 */
    let task: Array<Schema.Task> = await TaskModel.customFind({ _id: taskID }, null, null );
    let oldTaskTalkList = task[0].taskTalksID;
    let newTaskTalkList = [ ...oldTaskTalkList, save._id ];

    let update = await TaskModel.customUpdate({ _id: taskID }, { taskTalksID: newTaskTalkList })

    /**3. 查询Task$ */
    let task$: Array<Schema.Task$> = await TaskModel.findOne$( taskID );

    /**4. 返回数据 */
    let result: API.Res.AddNewTaskTalk = {
        status: '200',
        data: task$[0] 
    }
    ctx.body = result;

}