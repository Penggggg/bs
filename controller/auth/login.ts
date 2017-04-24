import { setCtx } from '../util';
import UserModel from '../../model/models/user.model';

const enum LoginError {
    PswNotEqual = 4001,
    UserExisted
}

/**用户注册 */
export let login = async( ctx ) => {

    /**变量声明 */
    let { userName, userPhone, password, password2 } = ctx.request.body as API.Query.Login;

    /**Ctx配置 */
    setCtx( ctx );
 
    /**检查密码配对情况 */
    if ( password !== password2 ) { 
        console.log('正查询密码匹配情况')
        return ctx.body = JSON.stringify({
            status: `${LoginError.PswNotEqual}`,
            msg: 'psw not equal'
        } as API.Res.Login )
    }

    /**检查是否已存在 */
    console.log('正查询用户匹配情况')
    let isExisted = await UserModel.findOneByPhone( userPhone );
    if ( isExisted ) {
        return ctx.body = JSON.stringify({
            status: `${LoginError.UserExisted}`,
            msg: 'user has been existed'
        } as API.Res.Login )
    }

    /**储存到数据库 */
    console.log('正把注册信息储存到数据库')
    let result = await UserModel.save( userName, userPhone, password )

    /**返回 */
    return ctx.body = JSON.stringify( Object.assign({
        status: '200',
        msg: 'success'
    }, { user: result }) as API.Res.Login );
}

