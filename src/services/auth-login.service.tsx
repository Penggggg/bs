
import { RouterState } from 'react-router';
import lsService from './local-storage.service';
import socketService from './socket.service';
import userStore from '../store/user';

import { _IUser } from '../interface/app.interface';
import { _ISocketSignIn, ISocketSignIn_, _ISocketSignOut } from '../interface/socket.interface';



class authLoginService {

    private signInName = 'user';
    private loginUrl = '/login';

    private socketNspSignIn = 'user';
    private socketEventSignIn = 'signInUser';
    private socketEventSignOut = 'signOutUser';

    private myLocalStorage = lsService;
    private mySocket = socketService;

    private myUserStore = userStore;
    
    constructor( ) {

    }


    /**auth服务：检查是否已经登录 */
    public isLogin = ( ) => this.myLocalStorage.getItem( this.signInName ) ? true : false;
    
    /**auth服务：检查并重定向 */
    public requireLogin = ( nextState: RouterState, replace: Function, next: Function ) => {
        if ( this.isLogin( )) {
            console.log(`checking auth: auth ok`)
            return next( );
        } else {
            replace( this.loginUrl );
            console.log(`checking auth: no ok`)
            return next( );
        }
    }

    /**auth服务：用户信息 */
    public userData = ( ) => this.myLocalStorage.getItem<_IUser>( this.signInName )

    /**auth服务：登录 */
    public signIn = ( user: _IUser ) => { 
        /**ls储存数据 */
        this.myLocalStorage.setItem( this.signInName,  user );
        /**socket连接 */
        let a = this.mySocket.connectNewNsp( this.socketNspSignIn )
        a.emit(`${this.socketEventSignIn}`, { user } as _ISocketSignIn);
        /**rx监控 */
        this.myUserStore.signIn.initSignIn( a, `${this.socketEventSignIn}` )

    }

    /**auth服务：登出 */
    public signOut = ( ) => { 
        /**服务器登出 */
        let user = this.myLocalStorage.getItem( this.signInName );
        this.mySocket.connectedNameSpace[this.socketNspSignIn].emit(`${this.socketEventSignOut}`, { user } as _ISocketSignOut )
        /**本地登出 */
        this.myLocalStorage.cleanItem( this.signInName );        
        this.mySocket.disconnectNsp( this.socketNspSignIn );
        /**rx取消监控 */
        this.myUserStore.signIn.cacelWatchSignIn( );
    }




}

export default new authLoginService( );