import * as Koa from 'koa';

import mySocket from '../../socket';
import MsgModel from '../../model/models/msg.model';
import UserModel from '../../model/models/user.model';
import ProjectModel from '../../model/models/project.model';

export let replyInvite = async( ctx: Koa.Context ) => {

    let result: API.Res.ReplyInvite;
    let { answer, mid } = ctx.request.body as API.Query.ReplyInvite;

    /**0. 查询msg数据、查询project数据 */
    let msgData: Array<APP.Msg> = await MsgModel.customFind({ _id: mid }, null, null );
    let projectData: Array<APP.Project> = await ProjectModel.customFind({ _id: msgData[ 0 ].PID }, null, null );

    let msg = msgData[ 0 ];
    let project = projectData[ 0 ];

    /**0. 检查dirty */
    if ( msg.dirty ) {
        result = {
            msg: '提交无效，此前您已经选择过是否加入该项目',
            status: '200'
        }
        return ctx.body = result;
    } else {

        /**1. 刷新msg dirty */
        let updateDirty = await MsgModel.updateDirty( mid );

        /**2-1. 拒绝加入 */
        if ( !answer ) {
            result = {
                msg: '您已拒绝加入邀请',
                status: '200'
            }
            return ctx.body = result;
        }

        /**2-2-0. 检查项目成员、组长、boss */
        if ( project.creator._id === msg.toUID ) {
            result = {
                msg: '您已是该项目的负责任人',
                status: '200'
            }
            return ctx.body = result;        
        } 
        if ( project.leader.find( leaderID =>  JSON.stringify(leaderID) ===  JSON.stringify(msg.toUID) )) {
            result = {
                msg: '您已是该项目的组长',
                status: '200'
            }
            return ctx.body = result;         
        } 
        if ( project.member.find( uid =>  JSON.stringify(uid) ===  JSON.stringify(msg.toUID) )) {
            result = {
                msg: '您已是该项目的成员',
                status: '200'
            }
            return ctx.body = result;         
        }

        /**2-2-1. 加入项目成员 */
        let newMembers = [ ...project.member, msg.toUID ];
        let updateMember = await ProjectModel.updateMember( project._id ,newMembers );

        /**查询新成员数据 */
        let newMember: Array<APP.User> = await UserModel.customFind({ _id: msg.toUID }, ['name'], null );

        /**2-2-2. socket通告 */
        mySocket.projectSockets[project._id].member.broadcast({
            msg: `欢迎新同学${newMember[0].name}加入项目！`,
            data: Object.assign({ }, project, { member: newMembers })
        });

        /**3. 返回数据 */
        result = {
            msg: `成功加入【${project.name}】项目！`,
            status: '200'
        }
        ctx.body = result;
    }

}