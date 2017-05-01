
import * as Koa from 'koa';

import { ENUM, CON } from '../../../index.con';
import mySocket from '../../../socket';
import MsgModel from '../../../model/models/msg.model';
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


    /**2. 更新Porject表 */

    /**2-0. 查询Project数据 */
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

    /**3-1. 项目namesapce通知：groups变更 */
    mySocket.projectSockets[pid].group.broadcast(  );

    /**3-2. group-leader通知 */
    touid.map(async( uid ) => {
        let model: APP.Msg;
        /**1.消息保存到数据库 */
        model = {
            fromUID: fromuid, 
            toUID: uid, 
            PID: pid, 
            content: `您已被升为【${oldProject[0].name}】的【${groupName}组】组长`, 
            type: ENUM.MsgType.GroupLeader,
            dirty: false,
            readed: false,
            title: '项目邀请',
            formType: ENUM.MsgFormType.noForm,
            replyURL: ''
        }

        let data: APP.Msg = await MsgModel.save( model );

        let { userSocket } = mySocket;

        /**2.用户在线：即时转发 */
        if ( userSocket.checkIsOnline( uid )) {
            
            console.log(`用户在线，准备转发`);

            let { _id, content, title, readed, meta } = data;
            userSocket.sendMsgTo( uid, {
                type: ENUM.MsgType.GroupLeader,
                eventName: `${CON.socketEvent.msg}`,
                content: {
                    _id: _id, 
                    content, title , readed, meta
                } as SOK.Res.MsgInviteContent
            })

        } 
    })    

    /**数据返回 */
    ctx.body = { status: '200'}
}