import * as Koa from 'koa';

import { ENUM, CON } from '../../index.con';
import SocketService from '../../socket';
import MsgModel from '../../model/models/msg.model';

export let inviteMember = async( ctx: Koa.Context ) => {

    let model: APP.Msg;
    let { userSocket } = SocketService;
    let { fromUID, toUID, PID, content, type } = ctx.request.body as API.Query.InviteMember;

    
    /**1.消息保存到数据库 */
    model = {
        fromUID, toUID, PID, content, type,
        dirty: false,
        readed: false,
        title: '项目邀请',
        formType: ENUM.MsgType.InviteMember,
        replyURL: '/api/v1/reply-invite'
    }

    let data: APP.Msg = await MsgModel.save( model );
    
    
    /**2.用户在线：即时转发 */
    if ( userSocket.checkIsOnline( toUID )) {
        
        console.log(`用户在线，准备转发`);

        let { _id, content, title, readed, meta } = data;
        userSocket.sendMsgTo( toUID, {
            type: ENUM.MsgType.InviteMember,
            eventName: `${CON.socketEvent.msg}`,
            content: {
                _id: _id, 
                content, title , readed, meta
            } as SOK.Res.MsgInviteContent
        })

    } 

    /**3：返回 */
    let result: API.Res.InviteMember = {
        msg: 'success',
        status: '200'
    } 
    ctx.body = result ;



}