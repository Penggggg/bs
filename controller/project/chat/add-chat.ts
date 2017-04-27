
import * as Koa from 'Koa';

import mySocket from '../../../socket';
import chatModel from '../../../model/models/chat.model';
import userModel from '../../../model/models/user.model';


export let addChat = async( ctx: Koa.Context ) => {

    let { pid, uid, content } = ctx.request.body as API.Query.AddChatRecord;

    /**1. 查询是否已存在该项目的chat记录 */
    let data: Array<APP.ChatList> = await chatModel.customFind({ pid }, null, null );

    if ( data.length !== 0 ) {
        /**2-2. 存在，则更新 */
        let oldRecord = data[0].record;
        let newRecord = [ ...oldRecord, {
            uid,
            content,
            createdTime: (new Date( )).getTime( )
        }]
        let update = await chatModel.myUpdate( pid, newRecord );

    } else {
        /**2-1. 不存在，则保存到数据库 */
        let save = await chatModel.save({ pid, uid, content });
    }


    /**3. 消息转发 */
    let userData: Array<Partial<APP.User>> = await userModel.customFind({ _id: uid }, 'name', null );
    let sokData: SOK.Res.NewChat = {
        createdTime: (new Date( )).getTime( ),        
        uid, content,
        userName: userData[0].name,
    }

    mySocket.projectSockets[pid].chat.broadcast( sokData );
    

    /**4. 数据返回 */
    let result: API.Res.AddChatRecord;
    result = {
        status: '200',
        msg: 'success'
    }
    ctx.body = result;

}