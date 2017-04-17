
import { Modal } from 'antd';
import { RouterState } from 'react-router';

import { CON } from '../index.con';

import lsService from './local-storage.service';
import socketService from './socket';
import UserStore from '../store/user';
import ProjectStore from  '../store/project';



class authLoginService {

    private connectedUserSocket: SocketIO.Socket;
    
    private signInName = 'user';

    private socketNspSignIn = 'user';

    private myLocalStorage = lsService;
    private mySocket = socketService;

    private myUserStore = UserStore;
    private myProjectStore = ProjectStore;
    
    constructor( ) {

    }


    /**auth服务：用户信息 */
    public userData = ( ) => this.myLocalStorage.getItem<APP.User>( this.signInName )

    /**auth服务：检查是否已经登录 */
    public isLogin = ( ) => this.myLocalStorage.getItem( this.signInName ) ? true : false;
    
    /**auth登录服务：检查并重定向 */
    public requireLogin = ( nextState: RouterState, replace: Function, next: Function ) => {
        if ( this.isLogin( )) {
            console.log(`checking auth: 已登录`)

        } else {
            replace('/login');
            console.log(`checking auth: 未登录`)
        }
        return next( );
    }


    /**auth服务：登录 */
    public signIn = ( user: APP.User ) => { 
        /**ls储存数据 */
        this.myLocalStorage.setItem( this.signInName,  user );
        /**socket连接 */
        this.connectedUserSocket = this.mySocket.connectNewNsp( CON.socketNSP.user );
        this.connectedUserSocket.emit(
            `${CON.socketEvent.signIn}`,  { user  } as SOK.Req.signIn);
        /**rx监控 */
        this.mySocket.SignIn.watch( this.connectedUserSocket );
        /**rx存数据 */
        this.myUserStore.data.save( user );
    }

    /**auth服务：登出 */
    public signOut = ( ) => { 
        /**服务器登出 */
        let user = this.myLocalStorage.getItem( this.signInName );
        this.mySocket.connectedNameSpace[CON.socketNSP.user].emit(`${CON.socketEvent.signOut}`, { user } as SOK.Req.signOut )
        /**本地登出 */
        this.myLocalStorage.cleanItem( this.signInName );        
        this.mySocket.disconnectNsp( CON.socketNSP.user );
        /**rx取消监控 */
        this.mySocket.SignIn.cancelWatch( );
    }




}

export default new authLoginService( );


