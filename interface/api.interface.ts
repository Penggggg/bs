import { _IUser } from './app.interface';

/**注册：用户注册 */
export interface _IPostQueryLogin {
    userName: string
    userPhone: string 
    password: string
    password2: string
}

/**注册：用户注册结果 */
export interface IPostLogin_ {
    msg: 'psw not equal' | 'success' | 'server err' | 'user has been existed',
    status: '4001'| '4002' | '500' | '200',
    user?: _IUser
}