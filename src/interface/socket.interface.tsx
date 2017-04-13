import { _IUser } from './app.interface';

/**scoketid */
export interface ISocketID {
    sid: string
}

/**登录 */
export interface _ISocketSignIn extends ISocketID {
    user: _IUser
}

/**登录 */
export interface ISocketSignIn_ {
    msg: 'success' | 'error',
    status: '200'
}

/**登出 */
export interface _ISocketSignOut extends _ISocketSignIn {
    
}