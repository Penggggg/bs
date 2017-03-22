import UserModel from '../../model/models/user.model';
import { _IPostQueryLogin, IPostLogin_ } from '../../interface/api.interface';

/**用户注册 */
export let login = async( ctx ) => {

    /**变量声明 */
    let { userName, userPhone, password, password2 } = ctx.request.body as _IPostQueryLogin;

    /**Ctx配置 */
    setCtx( ctx );
 
    /**检查密码配对情况 */
    if ( password !== password2 ) { 
        return ctx.body = JSON.stringify({
            status: '400',
            msg: 'psw not equal'
        } as IPostLogin_ )
    }

    /**检查是否已存在 */
    let isExisted = await UserModel.findOneByPhone( userPhone );
    if ( isExisted ) {
        console.log('?')
        return ctx.body = JSON.stringify({
            status: '400',
            msg: 'user has been existed'
        } as IPostLogin_ )
    }

    /**储存到数据库 */
    let result = await UserModel.save( userName, userPhone, password )

    return ctx.body = JSON.stringify( Object.assign({
        status: '200',
        msg: 'success'
    }, { user: result } ) as IPostLogin_ );
}

function setCtx( ctx ) {
    ctx.set( Object.assign({
        'Content-Type': 'application/json'
    }, process.env.NODE_ENV === 'development' ? { 'Access-Control-Allow-Origin': '*' } : { }))
}