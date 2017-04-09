import * as Koa from 'koa';
import ProjectModel from '../../model/models/project.model';

import { IGetAllProject_ } from '../../interface/api.interface';

const enum CreateError { }

export let allProject = async ( ctx: Koa.Context ) => {
    
    let data = await ProjectModel.findAllWithRef( );

    ProjectModel.findAllWithNest( );

    ctx.body = {
        data
    } as IGetAllProject_

}