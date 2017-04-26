import * as Koa from 'koa';

import chatModel from '../../../model/models/chat.model';


export let getChatList = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query as API.Query.ProjectChat;

    let data: Array<APP.ChatList> = await chatModel.findAllWithPid$( pid );

    let res;
    if ( data.length !== 0 ) {
        let list = data[0].record;
        res = list.map(( li ) => ({
            user: li.uid,
            content: li.content,
            createdTime: li.createdTime
        }))
    } else {
        res = [ ];
    }

    let result: API.Res.ProjectChat = {
        data: res
    }
    ctx.body = result;



}