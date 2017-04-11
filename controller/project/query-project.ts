import * as Koa from 'koa';
import ProjectModel from '../../model/models/project.model';

import { IGetAllProject_ } from '../../interface/api.interface';

const enum CreateError { }

export let allProject = async ( ctx: Koa.Context ) => {
    
    let data = await ProjectModel.findAllWithNest('_id');

    ctx.body = {
        data
    } as IGetAllProject_

}

export let projectDetail = async ( ctx: Koa.Context ) => {
    
    let { id } = ctx.params;
    let data = await ProjectModel.findDetailByIdWithNest( id, '_id name' );
    ctx.body = data[ 0 ];
}