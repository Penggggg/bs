import { Chat } from './chat';
import { File } from './file';
import { Group } from './group';
import { Member } from './member';
import { CON } from '../../index.con';
import { Notification } from './notification';

export class ProjectSocket {


    public file: File;
    public chat: Chat;
    public group: Group;
    public member: Member;
    public notification: Notification;
    private socket: SocketIO.Namespace;


    constructor( io: SocketIO.Server ,pid: string ) {
        console.log(`--------project-socket启动成功: ${pid}`)
        this.init( io, pid );
    }

    private init( io: SocketIO.Server ,pid: string ) {
        this.socket = io
            .of(`${pid}`);

            this.socket.on('connection', ( socket ) => {
                socket.emit(`${CON.socketEvent.project.getIn}`,
                    { msg: '您已进入该项目的实时通讯频道' } as SOK.Res.getInProject);

                /**事件通讯 */
                this.member = new Member( this.socket ); 
                this.chat = new Chat( this.socket );
                this.file = new File( this.socket );
                this.group = new Group( this.socket );
                this.notification = new Notification( this.socket );
            })
    }

    public broadcast( ) {
        
    }

}