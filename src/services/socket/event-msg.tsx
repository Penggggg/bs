
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';


class Msg {

    private sub: Subscription;

    public watch = ( socket: SocketIO.Socket ) => {
        
        this.sub = Observable
            .fromEvent( socket, `${CON.socketEvent.msg}`)
            .do( res => console.log( res ))
            .subscribe( )
    }

    public cancelWatch = ( ) => {
        this.sub.unsubscribe( );
    }

}

export default new Msg( );