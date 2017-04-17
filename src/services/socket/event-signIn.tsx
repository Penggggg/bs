import Notification from '../notification.service';
import { Observable, Subscription } from 'rxjs';

import userStore from '../../store/user';
import { CON } from '../../index.con';

class SignIn {

    private sub: Subscription;
    private sub2: Subscription;

    public watch = ( socket: SocketIO.Socket ) => {

        this.watchDisconnect( socket );

        this.sub = Observable
            .fromEvent<SOK.Res.signIn>( socket, `${CON.socketEvent.signIn}`)
            .do( res => {
                userStore.signIn.save( res.status === '200' ? true : false )
            })
            .filter( res => res.status === '200')
            .do(( ) => {
                Notification.open({
                    title: '系统消息',
                    msg: 'socket登录成功',
                    type: 'ok'
                })
            })
            .subscribe( )
        
    }   

    private watchDisconnect = ( socket: SocketIO.Socket ) => {

        this.sub2 = Observable
            .fromEvent( socket, 'disconnect')
            .do(( ) => {
                    Notification.open({
                        title: '系统消息',
                        msg: 'socket服务已断开',
                        type: 'error'
                    })
                })
            .subscribe( );

    }

    public cancelWatch = ( ) => {
        this.sub.unsubscribe( )
        this.sub2.unsubscribe( );
    }

}

export default new SignIn( );