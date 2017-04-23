import * as Koa from 'koa';;;

import MsgModel from '../../model/models/msg.model';


export let fetchAllMsgList = async( ctx: Koa.Context ) => {

    let { readed, toUID, limit, skip } = ctx.request.body as API.Query.AllMsg;

    let count = readed ? await MsgModel.countAll({ toUID }) : await MsgModel.countAll({ toUID, readed });

    let data: Array<Partial<APP.Msg>> = readed ? 
        await MsgModel.customFind(
            { toUID },
            ['_id', 'title', 'content', 'readed', 'meta'],
            { sort: [{"_id": -1 }], skip, limit }
        ) : 
        await MsgModel.customFind(
            { toUID, readed },
            ['_id', 'title', 'content', 'readed', 'meta'],
            { sort: [{"_id": -1 }], skip, limit }
        )

    /**返回 */
    let result: API.Res.AllMsg = {
        count,
        data
    }
    ctx.body = result;

}

export let fetchFadeMsgList = async( ctx: Koa.Context ) => {

    let { readed, toUID, limit, skip } = ctx.request.body as API.Query.AllMsg;

    let count = await MsgModel.countAll({ toUID, readed });

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


export let fetchMsgDetail = async( ctx: Koa.Context ) => {

    let { id } = ctx.query as API.Query.MsgDetail;

    /**更新数据：readed为true，然后返回最新数据 */
    let a = await MsgModel.updateReaded( id );
    let data: Array<APP.Msg> = await MsgModel.findDetailById( id )

    /**返回数据 */
    let result: API.Res.MsgDetail = data[0];
    ctx.body = result;

}