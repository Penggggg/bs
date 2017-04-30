import * as Koa from 'koa';

import { GroupModel } from '../../../model/models/group.model';
import ProjectModel from '../../../model/models/project.model';

export let allGroup$ = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query;
    let result: Array<APP.Group> = [ ]; 
    let groups: Array<Schema.Group$> = await GroupModel.customFind$({ pid }, null, null );

    result = groups.map(( group$ ) => {
        let tasks = group$.tasksID.map(( task$ ) => {
            
            let appTask = Object.assign({ }, task$, 
                { executors: [ ], taskTalks: [ ], childTasks: [ ]});
            delete appTask.executorsID;
            delete appTask.taskTalksID;
            delete appTask.childTasksID;
            
            appTask.executors = task$.executorsID;
            appTask.taskTalks = task$.taskTalksID;
            appTask.childTasks = task$.childTasksID;

            return appTask;
        })

        return {
            _id: group$._id,
            pid: group$.pid,
            creatorID: group$.creatorID,
            groupName: group$.groupName,
            tasks: tasks,
            leaders: group$.leadersID
        }

    })

    ctx.body = result;
}