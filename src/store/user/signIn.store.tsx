import notification from '../../services/notification.service';
import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

import { ISocketSignIn_ } from '../../interface/socket.interface';

export default class UserStoreSignIn {
    
    /**登录状态 */
    public signIn$: Observable<boolean>;
    private signInSub: Subscription;
    private connectionSub: Subscription;

    /**登录状态初始化 */
    public initSignIn = ( target: SocketIO.Socket, eventName: string ) => {

        let source = Observable
            .fromEvent<ISocketSignIn_>( target, eventName )
            .map( res => res.status === '200' ? true : false )

        let subject = new ReplaySubject( 1 );
        this.signIn$ = source.multicast( subject ).refCount( );

        this.watchSignIn( );
        this.watchUserSocket( target, 'disconnect' );
    }

    /**监控链接 */
    private watchUserSocket = ( target: SocketIO.Socket, eventName: string ) => {
        this.connectionSub = Observable
                .fromEvent( target, eventName )
                .do(( ) => {
                    notification.open({
                        title: '系统消息',
                        msg: 'socket服务已断开',
                        type: 'error'
                    })
                })
                .subscribe( )
    } 

    /**监控登录 */
    private watchSignIn = ( ) => {
        this.signInSub =  this.signIn$
            .do( isSign => {
                notification.open({
                    title: '系统消息',
                    msg: isSign ? 'socket链接成功' : 'socket服务链接失败',
                    type: 'ok'
                })
            })
            .subscribe( )
    }

    /**取消登录监控 */
    public cacelWatchSignIn = ( ) => {
        this.signInSub.unsubscribe( );
        this.connectionSub.unsubscribe( );
    }
} 