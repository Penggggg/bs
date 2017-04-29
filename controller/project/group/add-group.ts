
import * as Koa from 'koa';

import { GroupModel } from '../../../model/models/group.model';
import ProjectModel from '../../../model/models/project.model';

export let addNewGroup = async( ctx: Koa.Context ) => {

    let { fromuid, touid, pid, groupName } = ctx.request.body as API.Query.AddNewGroup;

    /**1. 保存到Groups表 */
    let saveGroup: Schema.Group = await GroupModel.mySave({ 
        pid, 
        groupName,
        creatorID: fromuid,
        leadersID: touid
     } as Schema.Group )


    /**2. 查询Project数据 */
    let oldProject: Array<Partial<Schema.Project>> = await ProjectModel.findAllGroupAndLeader( pid );
    let { leader, group } = oldProject[ 0 ];

    /**2-1. 新leader */
    let box = [ ];
    touid.map(( uid ) => {
        if ( !leader.find( leaderID => leaderID !== uid )) {
            box.push( uid );
        }
    })

    let newLeaders = [ ...leader, ...box ];

    /**2-2. 新group */
    let newGroups = [ ...group, saveGroup._id ];

    /**2-3. 更新project的group和leader */
    let projectUpdate = await ProjectModel.updateAllGroupAndLeader( pid, newLeaders, newGroups );

    /**3. socket通知 */

    /**3-1. 项目namesapce通知：推送新project */

    /**3-2. 组长通知：message */

    /**数据返回 */
    ctx.body = { data: 'ok'}
}