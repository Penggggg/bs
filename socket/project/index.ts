
import { CON } from '../../index.con';
import { Member } from './member';
import { Chat } from './chat';

export class ProjectSocket {

    private socket: SocketIO.Namespace;
    public chat: Chat;
    public member: Member;


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

            })
    }

    public broadcast( ) {
        
    }

}