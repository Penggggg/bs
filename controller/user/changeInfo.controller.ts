import * as Koa from 'koa';

import UserModel from '../../model/models/user.model';


export let changeUserInfo = async( ctx: Koa.Context ) => {

    let { _id, name, phone } = ctx.request.body;

    /**更新数据库 */
    let update = await UserModel.updateInfo( _id, name, phone );

    ctx.body = {
        status: '200'
    }

}

export let changeUserPsw = async( ctx: Koa.Context ) => {

    let { _id, newPassword } = ctx.request.body;

    /**更新数据库 */
    let update = await UserModel.updatePsw2( _id, newPassword );

    ctx.body = {
        status: '200'
    }
}