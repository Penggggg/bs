
import { RouterState } from 'react-router';
import lsService from './local-storage.service';
import socketService from './socket.service';
import { _IUser } from '../interface/app.interface';


class authLoginService {

    private signInName = 'user';
    private loginUrl = '/login';
    private socketNspSignIn = 'user';
    private socketEventSignIn = 'signInUser'

    private myLocalStorage = lsService;
    private mySocket = socketService;
    
    constructor( ) {
        
    }


    /**auth服务：检查是否已经登录 */
    public isLogin = ( ) => this.myLocalStorage.getItem( this.signInName ) ? true : false;
    
    /**auth服务：检查并重定向 */
    public requireLogin = ( nextState: RouterState, replace: Function, next: Function ) => {
        if ( this.isLogin( )) {
            return next( );
        } else {
            replace( this.loginUrl );
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
        a.emit(`${this.socketEventSignIn}`, { user })
    }

    /**auth服务：登出 */
    public signOut = ( ) => { 
        this.myLocalStorage.cleanItem( this.signInName );
        this.mySocket.disconnectNsp( this.socketNspSignIn )
    }




}

export default new authLoginService( );