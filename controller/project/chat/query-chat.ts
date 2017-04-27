import * as Koa from 'koa';

import chatModel from '../../../model/models/chat.model';


export let getChatList = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query as API.Query.ProjectChat;

    let data = await chatModel.findAllWithPid$( pid );

    ctx.body = data;



}