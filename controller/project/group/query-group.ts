import * as Koa from 'koa';

import { GroupModel } from '../../../model/models/group.model';
import ProjectModel from '../../../model/models/project.model';

export let allGroup$ = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query;
    let result: Array<APP.Group> = [ ]; 
    let groups: Array<Schema.Group$> = await GroupModel.customFind$({ pid }, null, null );

    ctx.body = groups;
}