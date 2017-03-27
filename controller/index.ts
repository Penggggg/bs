
import { login } from './auth/login';
import { resetPsw } from './auth/reset';
import { sginIn } from './auth/signin';


export default ( router ) => {

    /**权限模块：注册功能 */
    router.post('/api/v1/login', login )
    /**权限模块：重置密码功能 */
    router.post('/api/v1/resetpsw', resetPsw )
    /**权限模块：登录功能 */
    router.post('/api/v1/signin', sginIn )
}