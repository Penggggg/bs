import { Observable } from 'rxjs';
import SignIn from './event-signIn';
import Msg from './event-msg';


class socketService {

    public SignIn = SignIn;
    public Msg = Msg;

    private connectedUrl = 'http://localhost'; 
    public connectedNameSpace: {
        [ key: string ]: SocketIO.Socket
    } = {  }

    public connectNewNsp( name: string ): SocketIO.Socket {
        let socketClient = io(`${this.connectedUrl}/${name}`);
        this.connectedNameSpace[name] = socketClient;
        return socketClient
    }

    public disconnectNsp( name: string ) {
        this.connectedNameSpace[name].disconnect( );
        delete this.connectedNameSpace[name]
    }

}


export default new socketService( );