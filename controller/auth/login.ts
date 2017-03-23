import UserModel from '../../model/models/user.model';
import { _IPostQueryLogin, IPostLogin_ } from '../../interface/api.interface';

const enum LoginResult {
    PswNotEqual = 4001,
    UserExisted
}

/**用户注册 */
export let login = async( ctx ) => {

    /**变量声明 */
    let { userName, userPhone, password, password2 } = ctx.request.body as _IPostQueryLogin;

    /**Ctx配置 */
    setCtx( ctx );
 
    /**检查密码配对情况 */
    if ( password !== password2 ) { 
        console.log('正查询密码匹配情况')
        return ctx.body = JSON.stringify({
            status: `${LoginResult.PswNotEqual}`,
            msg: 'psw not equal'
        } as IPostLogin_ )
    }

    /**检查是否已存在 */
    console.log('正查询用户匹配情况')
    let isExisted = await UserModel.findOneByPhone( userPhone );
    if ( isExisted ) {
        return ctx.body = JSON.stringify({
            status: `${LoginResult.UserExisted}`,
            msg: 'user has been existed'
        } as IPostLogin_ )
    }

    /**储存到数据库 */
    console.log('正把注册信息储存到数据库')
    let result = await UserModel.save( userName, userPhone, password )

    return ctx.body = JSON.stringify( Object.assign({
        status: '200',
        msg: 'success'
    }, { user: result }) as IPostLogin_ );
}

function setCtx( ctx ) {
    ctx.set( Object.assign({
        'Content-Type': 'application/json'
    }, process.env.NODE_ENV === 'development' ? { 'Access-Control-Allow-Origin': '*' } : { }))
}