import { setCtx } from '../util';
import UserModel from '../../model/models/user.model';
import { ISUser } from '../../interface/schema.interface';

import { IPostResetPsw_, _IPostQueryResetPsw } from '../../interface/api.interface';

const enum ResetError {
    UserNotExisted = 4001 ,
    PhoneUnCorrect,
    PswNotEqual
}

/**忘记密码 */
export let resetPsw = async( ctx ) => {

    /**变量声明 */
    let { resetUserName, resetPsw, resetPsw2, reseUserPhone } = ctx.request.body as _IPostQueryResetPsw;

    /**Ctx配置 */
    setCtx( ctx );

    /**查询用户存在 */
    console.log('正在检查用户是否存在');
    let UserData: ISUser = await UserModel.findOneByPhone( reseUserPhone );
    if ( !UserData ) {
        return ctx.body = JSON.stringify({
            status: `${ResetError.UserNotExisted}`,
            msg: 'user is not existed'
        } as IPostResetPsw_ )
    }

    /**查询phone是否匹配 */
    console.log('正在检查phone是否匹配')
    if ( !!UserData && ( UserData.phone !== reseUserPhone || resetUserName !== UserData.name )) {
        return ctx.body = JSON.stringify({
            status: `${ResetError.PhoneUnCorrect}`,
            msg: 'phone not right'
        } as IPostResetPsw_ )
    }

    /**检查密码配对 */
    if ( resetPsw !== resetPsw2 ) { 
        console.log('正查询密码匹配情况')
        return ctx.body = JSON.stringify({
            status: `${ResetError.PswNotEqual}`,
            msg: 'psw not equal'
        } as IPostResetPsw_ )
    }

    /**保存到数据库 */
    console.log('正把更新信息储存到数据库')
    let result = await UserModel.updatePsw( reseUserPhone, resetPsw );
    
    /**返回 */
    return ctx.body = JSON.stringify({
        status: '200',
        msg: 'success'
    } as IPostResetPsw_  );    

}