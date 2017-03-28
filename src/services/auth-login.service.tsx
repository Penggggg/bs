import lsService from './local-storage.service';
import { RouterState } from 'react-router';
import { _IUser } from '../interface/app.interface';


class authLoginService {

    private loginName = 'user';
    private loginUrl = '/login';

    /**auth服务：检查是否已经登录 */
    public isLogin = ( ) => lsService.getItem( this.loginName ) ? true : false;
    
    /**auth服务：检查并重定向 */
    public requireLogin = ( nextState: RouterState, replace: Function, next: Function ) => {
        if ( this.isLogin( )) {
            return next( );
        } else {
            replace( this.loginUrl );
            return next( );
        }
    }

    /**auth服务：登录 */
    public signIn = ( user: _IUser ) => { 
        /**ls储存数据 */
        lsService.setItem( this.loginName,  user );
        /**socket连接 */
    }

    /**auth服务：登出 */
    public signOut = ( ) => { 
        lsService.cleanItem( this.loginName )
    }


}

export default new authLoginService( )