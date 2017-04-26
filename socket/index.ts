import userSocket from './user';
import { ProjectSocket } from './project';
import projectModel from '../model/models/project.model';

class mySocket {

    private serverIO: SocketIO.Server;

    public userSocket = new userSocket( );
    public projectSockets: {
        [ key: string ]: ProjectSocket
    } = { };


    public async init( io: SocketIO.Server ) {

        this.serverIO = io;
        
        /**用户 namespace */
        this.userSocket.initIo( io );

        /**添加已存在的project-socket */
        let projects: Array<APP.Project> = await projectModel.customFind({ }, null, null );
        
        projects.map(( project ) => {
            this.addProjectSocket( project._id );
        })
    }

    /**动态添加pid的namespace socket */
    public addProjectSocket( pid: string ) {
        this.projectSockets[pid] = new ProjectSocket( this.serverIO ,pid );
    }

}


export default new mySocket( );