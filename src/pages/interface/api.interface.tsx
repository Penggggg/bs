import { _IUser, IProject } from './app.interface'


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

/**登录：query */
export interface _IPostQuerySignIn {
    signPhone: string
    signPsw: string
}

/**登录：处理结果 */
export interface IPostSignIn_ {
    msg: 'user is not existed' | 'psw not right' | 'server err' | 'success'
    status: '4001' | '4002' | '200' | '500'
    user: _IUser
}


/**新增项目：query */
export interface _IPostQueryCreateProject {
    projectName: string
    projectInfo: string
    creatorID: string
}


/**新建项目：结果 */
export interface IPostCreateProject_ {
    msg: 'success' | 'server error',
    status: '200' | '500'
}


/**所有项目：结果 */
export interface IGetAllProject_ {
    data: Array<IProject>
}


/**所有符合条件的用户：查询 */
export interface IPostQueryAllUser_ {
    name: string
}