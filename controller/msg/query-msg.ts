import * as Koa from 'koa';

import MsgModel from '../../model/models/msg.model';


export let fetchAllMsgList = async( ctx: Koa.Context ) => {

    let { readed, toUID } = ctx.request.query as Partial<APP.Msg>;

    MsgModel.countAll({ toUID })

    let data: Array<Partial<APP.Msg>> = await MsgModel.customFind(
            { readed, toUID }, 
            ['_id', 'title', 'content', 'readed', 'meta'], 
            { sort: [{"_id": -1 }], skip: 0, limit: 10 });

    /**返回 */
    ctx.body = data; 

}

export let fetchFadeMsgList = async( ctx: Koa.Context ) => {

    let { readed, toUID, limit, skip } = ctx.request.body as API.Query.AllMsg;

    let count = await MsgModel.countAll({ toUID });

    let data: Array<Partial<APP.Msg>> = await MsgModel.customFind(
            { readed, toUID }, 
            ['_id', 'title', 'content', 'readed', 'meta'], 
            { sort: [{"_id": -1 }], skip, limit });

    /**返回 */
    let result: API.Res.AllMsg = {
        count,
        data
    }
    ctx.body = result;

}