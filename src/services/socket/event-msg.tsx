
import { Observable, Subscription } from 'rxjs';


import msgStore from '../../store/msg';
import userStore from '../../store/user';
import http from '../../services/http.service';
import { CON, ENUM, Util } from '../../index.con';
import Notification from '../../services/notification.service';


class Msg {

    private sub: Subscription;

    public watch = ( socket: SocketIO.Socket ) => {
        
        this.sub = Observable
            .fromEvent<SOK.Res.MsgInvite>( socket, `${CON.socketEvent.msg}`)
            .do( res => {
                /**获取最新数据 */
                msgStore.data.refresh( );
                /**提示 */
                Notification.open({
                    title: res.content.title,
                    msg: res.content.content
                })
            })
            .subscribe( )
    
        setTimeout(( ) => msgStore.data.refresh( ), 200 )
    }

    public cancelWatch = ( ) => {
        this.sub.unsubscribe( );
    }

}

export default new Msg( );