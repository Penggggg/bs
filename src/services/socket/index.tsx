import { Observable } from 'rxjs';
import SignIn from './event-signIn';
import Msg from './event-msg';
import { EventProjectMember } from './event-project-member';
import { EventProjectGetIn } from './event-project-getIn';
import { EventProjectChat } from './event-project-chat';
import { EventProjectFile } from './event-project-file';
import { EventProjectGroup } from './event-project-group';
import { EventProjectSchedule } from './event-schedule';
import { EventProjectNotification } from './event-notification';

class socketService {

    public SignIn = SignIn;
    public Msg = Msg;

    private connectingPID: string;
    private connectedUrl = 'http://localhost'; 
    public connectedNameSpace: {
        [ key: string ]: SocketIO.Socket
    } = {  }

    private connectingProjectSocket: {
        [ key: string ]: {
            server: SocketIO.Socket,
            events: Array<APP.ProjectEvent>
        }
    } = { };

    public connectNewNsp( name: string ): SocketIO.Socket {
        let socketClient = io(`${this.connectedUrl}/${name}`);
        this.connectedNameSpace[name] = socketClient;
        return socketClient
    }

    public connectNewProject( pid: string ) {

        /**接触上次namespace */
        if ( !!this.connectingPID ) {
            this.disconnectProjectSocket( this.connectingPID );
        }

        /**新建namespace */
        let socketClient = io(`${this.connectedUrl}/${pid}`);

        this.connectingProjectSocket[pid] = {
            server: null,
            events: [ ]
        }

        /**保存该链接下的事件实例与socket */
        this.connectingPID = pid;
        this.connectingProjectSocket[pid].server = socketClient;
        
        /**project-socket事件监听 */
        this.connectingProjectSocket[pid].events.push( new EventProjectMember( socketClient ));
        this.connectingProjectSocket[pid].events.push( new EventProjectGetIn( socketClient ));
        this.connectingProjectSocket[pid].events.push( new EventProjectChat( socketClient ))
        this.connectingProjectSocket[pid].events.push( new EventProjectFile( socketClient ));
        this.connectingProjectSocket[pid].events.push( new EventProjectGroup( socketClient ));
        this.connectingProjectSocket[pid].events.push( new EventProjectNotification( socketClient ));
        this.connectingProjectSocket[pid].events.push( new EventProjectSchedule( socketClient ));
    }

    public disconnectNsp( name: string ) {
        this.connectedNameSpace[name].disconnect( );
        delete this.connectedNameSpace[name]
    }

    public disconnectProjectSocket( pid: string ) {
        this.connectingProjectSocket[pid].server.disconnect( );
        this.connectingProjectSocket[pid].events.map(( eventExample ) => {
            console.log(`${pid}项目通讯通道已解除链接`)
            eventExample.cancelSub( );
        })
        delete this.connectingProjectSocket[pid];
    }

}


export default new socketService( );