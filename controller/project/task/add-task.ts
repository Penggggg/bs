import * as Koa from 'koa';


import mySocket from '../../../socket';
import { ENUM, CON } from '../../../index.con';
import MsgModel from '../../../model/models/msg.model';
import ProjectModel from '../../../model/models/project.model';
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


    let project: Array<Schema.Project> = await ProjectModel.customFind({ _id: pid }, 'name', null);

    /**3-2. socket通知 executorsID */
    executorsID.map(async( exeID ) => {
        
        let model: APP.Msg;

        /**1.消息保存到数据库 */
        model = {
            fromUID: creatorID, 
            toUID: exeID, 
            PID: pid, 
            content: `您在项目【${project[0].name}】中，被安排了一条新任务。请注意查看`, 
            type: ENUM.MsgType.NewTask,
            dirty: false,
            readed: false,
            title: '项目消息',
            formType: ENUM.MsgFormType.noForm,
            replyURL: ''
        }

        let data: APP.Msg = await MsgModel.save( model );

        let { userSocket } = mySocket;

        /**2.用户在线：即时转发 */
        if ( userSocket.checkIsOnline( exeID )) {
            
            console.log(`用户在线，准备转发`);

            let { _id, content, title, readed, meta } = data;
            userSocket.sendMsgTo( exeID, {
                type: ENUM.MsgType.GroupLeader,
                eventName: `${CON.socketEvent.msg}`,
                content: {
                    _id: _id, 
                    content, title , readed, meta
                } as SOK.Res.MsgInviteContent
            })

        } 

    })

    ctx.body = {
        status: '200'
    }

}