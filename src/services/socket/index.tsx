import { Observable } from 'rxjs';
import SignIn from './event-signIn';
import Msg from './event-msg';


class socketService {

    public SignIn = SignIn;
    public Msg = Msg;

    private connectingPID: string;
    private connectedUrl = 'http://localhost'; 
    public connectedNameSpace: {
        [ key: string ]: SocketIO.Socket
    } = {  }

    public connectNewNsp( name: string ): SocketIO.Socket {
        let socketClient = io(`${this.connectedUrl}/${name}`);
        this.connectedNameSpace[name] = socketClient;
        return socketClient
    }

    public connectNewProject( pid: string ): SocketIO.Socket {

        /**接触上次namespace */
        if ( !!this.connectingPID ) {
            this.disconnectNsp( this.connectingPID );
        }

        /**新建namespace */
        let socketClient = io(`${this.connectedUrl}/${pid}`);
        this.connectingPID = pid;
        this.connectedNameSpace[pid] = socketClient;
        return socketClient
    }

    public disconnectNsp( name: string ) {
        this.connectedNameSpace[name].disconnect( );
        delete this.connectedNameSpace[name]
    }

}


export default new socketService( );