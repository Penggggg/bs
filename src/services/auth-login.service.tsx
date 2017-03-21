import lsService from './local-storage.service';
import { RouterState } from 'react-router';


class authLoginService {

    private loginName = 'loginName';
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
    public login = ( ) => new Promise( async ( resolve, reject ) => {

    })

    /**auth服务：注册 */
    public signIn = ( username: string, phone: string ,psw: string ) => new Promise( async ( resolve, reject ) => {
        
    })

}

export default new authLoginService( )