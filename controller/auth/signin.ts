import { setCtx } from '../util';
import UserModel from '../../model/models/user.model';
import { ISUser } from '../../interface/schema.interface';

import { IPostSignIn_, _IPostQuerySignIn } from '../../interface/api.interface';


const enum SignInError {
    UserNotExisted = 4001,
    PswNotRight
}

/**登录功能 */
export let sginIn = async( ctx ) => {

    /**变量声明 */
    let { signPhone, signPsw } = ctx.request.body as _IPostQuerySignIn;

    /**ctx配置 */
    setCtx( ctx );

    /**查询用户是否存在 */
    console.log('正在检查用户是否存在');
    let UserData: ISUser = await UserModel.findOneByPhone( signPhone );
    if ( !UserData ) {
        return ctx.body = JSON.stringify({
            status: `${SignInError.UserNotExisted}`,
            msg: 'user is not existed'
        } as IPostSignIn_ )
    }

    /**检查密码是否匹配 */
    console.log('检查密码是否匹配')
    if ( !!UserData && ( UserData.password !== signPsw )) {
        return ctx.body = JSON.stringify({
            status: `${SignInError.PswNotRight}`,
            msg: 'psw not right'
        } as IPostSignIn_ )
    }

    /**返回 */
    return ctx.body = JSON.stringify({
        msg: 'success',
        status: '200',
        user: UserData
    } as IPostSignIn_ )

}