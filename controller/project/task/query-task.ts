import * as Koa from 'koa';


import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { GroupModel } from '../../../model/models/group.model';

export let taskDetail$ = async( ctx: Koa.Context ) => {

    let { tid } = ctx.query;

    let data: Array<Schema.Task$> = await TaskModel.findOne$( tid )


    ctx.body = data[0];


}