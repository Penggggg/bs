import * as Koa from 'koa';
import ProjectModel from '../../model/models/project.model';

import { _IPostQueryCreateProject, IPostCreateProject_ } from '../../interface/api.interface';


const enum CreateError { }

export let createProject = async ( ctx: Koa.Context ) => {
    
    let { projectName, projectInfo, creatorID } = ctx.request.body as _IPostQueryCreateProject;

    let a = await ProjectModel.save( projectName, projectInfo, creatorID );

    ctx.body = {
        msg: 'success',
        status: '200'
    } as IPostCreateProject_

}