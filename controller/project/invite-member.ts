import * as Koa from 'koa';

import SocketService from '../../socket';
import UserModel from '../../model/models/user.model';

export let inviteMember = async( ctx: Koa.Context ) => {

    let { userSocket } = SocketService;
    let { fromUID, toUID, PID, content, type } = ctx.request.body as API.Query.InviteMember;
    
    /**用户在线：即时转发 */
    if ( userSocket.checkIsOnline( toUID )) {
        
    } 



}