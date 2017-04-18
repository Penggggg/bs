
import { Observable, Subscription } from 'rxjs';

import { CON, ENUM } from '../../index.con';
import MsgStore from '../../store/msg';
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
            .filter( res => res.type === ENUM.MsgType.InviteMember )
            .do( res => {
                MsgStore.data.save( res.content )
            })
            .subscribe( )
    }

    public cancelWatch = ( ) => {
        this.sub.unsubscribe( );
    }

}

export default new Msg( );