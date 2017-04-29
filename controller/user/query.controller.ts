import * as Koa from 'koa';

import UserModel from '../../model/models/user.model';
import projectModel from '../../model/models/project.model';


export let fetchAllUserByName = async( ctx: Koa.Context ) => {

    let { name } = ctx.request.body as API.Query.AllUser;

    if ( name === '' ) {
        ctx.body = await UserModel.findAll(['name', '_id', 'phone']);
    } else {
        ctx.body = await UserModel.findAllByName( name, ['name', '_id', 'phone']);
    }

}

export let allMemberInProject = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query as API.Query.AllMemberLeader;

    let data: Array<Schema.Project$> = await projectModel.allMember$( pid );

    let result: Array<APP.User> = [ ...data[0].member, ...data[0].leader ];
    ctx.body = result;
}