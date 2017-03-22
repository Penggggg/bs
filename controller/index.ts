
import { login } from './auth/login';

export default ( router ) => {
    router.get('/', async( ctx ) => {
        ctx.body = '???'
    })

    /**权限模块：注册功能 */
    router.post('/api/v1/login', login )
}