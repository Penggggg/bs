import * as Koa from 'koa';
import socketService from '../../socket';
import ProjectModel from '../../model/models/project.model';


const enum CreateError { }

export let createProject = async ( ctx: Koa.Context ) => {
    
    let { projectName, projectInfo, creatorID } = ctx.request.body as API.Query.CreateProject;

    let newProject: APP.Project = await ProjectModel.save( projectName, projectInfo, creatorID );

    /**添加pid-namespace-socket */
    socketService.addProjectSocket( newProject._id );

    ctx.body = {
        msg: 'success',
        status: '200'
    } as API.Res.CreateProject

}