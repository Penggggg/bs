import userSocket from './user';
import { ProjectSocket } from './project';
import projectModel from '../model/models/project.model';

// io
//     .of('/chat')
//     .on('connection', function (socket) {
//         // socket.broadcast.emit('news', { hello: 'world' });
//         socket.join('dog')
//         socket.broadcast.in('dog').emit('news', { room: 'dog-1' });
//     });


class mySocket {

    private serverIO: SocketIO.Server;

    public userSocket = new userSocket( );

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
        new ProjectSocket( this.serverIO ,pid );
    }

}


export default new mySocket( );