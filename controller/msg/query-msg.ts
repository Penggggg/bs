import * as Koa from 'koa';

import MsgModel from '../../model/models/msg.model';


export let fetchAllMsgList = async( ctx: Koa.Context ) => {

    let { readed, toUID } = ctx.request.query as Partial<APP.Msg>;

    let data: Array<APP.Msg> = await MsgModel.findAllByToUIDAndReaded( toUID, readed );

    console.log( data )

    /**返回 */
    let result: Array<Partial<APP.Msg>> = [ ];

    result = data.map(({ _id, title, content, readed, meta }) => ({
        _id, title, content, readed, meta
    } as APP.Msg ))

    ctx.body = result 

}