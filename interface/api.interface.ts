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

/**忘记密码:表单 */
export interface _IPostQueryResetPsw { 
    resetUserName: string
    reseUserPhone: string
    resetPsw: string
    resetPsw2: string
}

/**忘记密码：处理结果 */
export interface IPostResetPsw_ {
    msg: 'user is not existed' | 'phone not right' | 'psw not equal' | 'server err' | 'success'
    status: '4001' | '4002' | '4003' | '200' | '500'
}