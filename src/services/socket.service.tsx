import { Observable } from 'rxjs';
import { _IUser } from '../interface/app.interface';


class socketService {

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