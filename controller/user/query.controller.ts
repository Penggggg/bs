import * as Koa from 'koa';

import UserModel from '../../model/models/user.model';

import { IPostQueryAllUser_  } from '../../interface/api.interface';


export let fetchAllUserByName = async( ctx: Koa.Context ) => {

    let { name } = ctx.request.body as IPostQueryAllUser_;

    if ( name === '' ) {
        ctx.body = await UserModel.findAll(['name', '_id', 'phone']);
    } else {
        ctx.body = await UserModel.findAllByName( name, ['name', '_id', 'phone']);
    }

}