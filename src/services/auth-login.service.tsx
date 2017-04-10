
import { Modal } from 'antd';

import { RouterState } from 'react-router';
import lsService from './local-storage.service';
import socketService from './socket.service';


import UserStore from '../store/user';
import ProjectStore from  '../store/project';

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

    private myUserStore = UserStore;
    private myProjectStore = ProjectStore;
    
    constructor( ) {

    }


    /**auth服务：用户信息 */
    public userData = ( ) => this.myLocalStorage.getItem<_IUser>( this.signInName )

    /**auth服务：检查是否已经登录 */
    public isLogin = ( ) => this.myLocalStorage.getItem( this.signInName ) ? true : false;
    
    /**auth登录服务：检查并重定向 */
    public requireLogin = ( nextState: RouterState, replace: Function, next: Function ) => {
        if ( this.isLogin( )) {
            console.log(`checking auth: 已登录`)
            if( nextState.location.pathname.indexOf('/project/') === 0 ) {
                this.requireMember( replace, next )
            } else {
                return next( );
            }
        } else {
            replace( this.loginUrl );
            console.log(`checking auth: 未登录`)
            return next( );
        }
    }

    /**auth项目权限服务：检查是否属于该项目成员 */
    private requireMember = ( replace:Function, next: Function ) => {
        console.log('项目权限判断中..');
        let sub = this.myUserStore.data.userData$
            .combineLatest(this.myProjectStore.data.data$)
            .do( res => {
                console.log('????')
                let userID = res[0]._id;
                /**creator判断 */
                if ( userID === res[1].creator._id ) {
                    this.myProjectStore.role.save('creator');
                    return next( );
                }
                /**leader判断 */
                let isLeader = res[1].leader.some(( leader ) => {
                    if ( leader._id === userID ) {
                        this.myProjectStore.role.save('leader');
                        next( );
                        return true;
                    }
                    return false;
                })
                /**member判断 */
                if ( !isLeader ) {
                    res[1].member.some(( member ) => {
                        if ( member._id === userID ) {
                            this.myProjectStore.role.save('member');
                            next( );
                            return true;
                        }
                        return false;
                    })
                }
                /**没有权限 */
                Modal.warning({
                    title: 'Warning',
                    content: '您没有该项目的权限！请先申请权限'
                })
                replace('/projects');
                return next( );
            })
            .subscribe( );
        sub.unsubscribe( );
    }


    /**auth服务：登录 */
    public signIn = ( user: _IUser ) => { 
        /**ls储存数据 */
        this.myLocalStorage.setItem( this.signInName,  user );
        /**socket连接 */
        let a = this.mySocket.connectNewNsp( this.socketNspSignIn )
        a.emit(`${this.socketEventSignIn}`, { user } as _ISocketSignIn);
        /**rx监控 */
        this.myUserStore.signIn.initSignIn( a, `${this.socketEventSignIn}` )
        /**rx存数据 */
        this.myUserStore.data.save( user );
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