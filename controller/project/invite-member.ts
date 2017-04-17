import * as Koa from 'koa';

import SocketService from '../../socket';
import UserModel from '../../model/models/user.model';

export let inviteMember = async( ctx: Koa.Context ) => {

    let { fromUID, toUID, PID, content, type } = ctx.request.body as API.Query.InviteMember;

    let toUser: APP.User = await UserModel.findOneByID( toUID );
    
    console.log(SocketService.userSocket.checkIsOnline( toUser.phone ))


}