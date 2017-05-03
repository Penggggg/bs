import * as Koa from 'koa';


import mySocket from '../../../socket';
import { TaskModel } from '../../../model/models/task.model';
import { GroupModel } from '../../../model/models/group.model';

export let taskDetail$ = async( ctx: Koa.Context ) => {

    let { tid } = ctx.query;

    let data: Array<Schema.Task$> = await TaskModel.findOne$( tid )


    ctx.body = data[0];


}

export let allUserTask$ = async( ctx: Koa.Context ) => {

    let result: Array<Partial<Schema.Task$>>;
    let { uid } = ctx.query;

    result = await TaskModel.findUserTask$( uid );

    ctx.body = {
        status: '200',
        data: result
    }

}