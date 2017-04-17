
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';
import Notification from '../../services/notification.service';


class Msg {

    private sub: Subscription;

    public watch = ( socket: SocketIO.Socket ) => {
        
        this.sub = Observable
            .fromEvent<SOK.Res.MsgInvite>( socket, `${CON.socketEvent.msg}`)
            .do( res => {
                let { title, content } = res.content;
                Notification.open({
                    title: `${title}`,
                    msg: `${content}` 
                })
            })
            .subscribe( )
    }

    public cancelWatch = ( ) => {
        this.sub.unsubscribe( );
    }

}

export default new Msg( );