import * as Koa from 'koa';
import MsgModel from '../../model/models/msg.model';
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

    console.log(project.member)
    console.log(msg.toUID)
    console.log( typeof project.member[0])
    console.log( typeof msg.toUID)
    /**2-2-0. 检查项目成员、组长、boss */
    if ( project.creator._id === msg.toUID ) {
        result = {
            msg: '您已是该项目的负责任人',
            status: '200'
        }
        return ctx.body = result;        
    } 
    if ( project.leader.find( leaderID => leaderID === msg.toUID )) {
        result = {
            msg: '您已是该项目的组长',
            status: '200'
        }
        return ctx.body = result;         
    } 
    if ( project.member.find( uid => uid === msg.toUID )) {
        console.log('???????????')
        result = {
            msg: '您已是该项目的成员',
            status: '200'
        }
        return ctx.body = result;         
    }

    /**2-2-1. 加入项目成员 */
    let newMembers = [ ...project.member, msg.toUID ];
    let updateMember = await ProjectModel.updateMember( project._id ,newMembers );


    /**2-2-2. socket通告 */


    /**3. 返回数据 */

}