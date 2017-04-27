
import * as Koa from 'Koa';

import mySocket from '../../../socket';
import chatModel from '../../../model/models/chat.model';
import userModel from '../../../model/models/user.model';


export let addChat = async( ctx: Koa.Context ) => {

    let { pid, uid, content } = ctx.request.body as API.Query.AddChatRecord;

    /**1. 保存到数据库 */
    let save = await chatModel.save({ pid, uid, content })

    /**2. 消息转发 */
    let userData: Array<Partial<APP.User>> = await userModel.customFind({ _id: uid }, 'name', null );

    let sokData: any = {
        _id: save._id,
        uid: {
            _id: userData[0]._id,
            name: userData[0].name
        },
        content: save.content,
        createdTime: `${save.createdTime}`,
        userName: userData[0].name
    }

    mySocket.projectSockets[pid].chat.broadcast( sokData );
    

    /**1. 数据返回 */
    let result: API.Res.AddChatRecord;
    result = {
        status: '200',
        msg: 'success'
    }
    ctx.body = result;

}