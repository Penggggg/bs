import * as fs from 'fs';
import { login } from './auth/login';
import { resetPsw } from './auth/reset';
import { sginIn } from './auth/signin';
import { createProject } from './project/create-project';
import { fetchAllUserByName } from './user/query.controller';
import { allProject, projectDetail } from './project/query-project';


export default ( router ) => {

    /**首页 */
    router.get('/', getIndex )

    /**权限模块：注册功能 */
    router.post('/api/v1/login', login )
    /**权限模块：重置密码功能 */
    router.post('/api/v1/resetpsw', resetPsw )
    /**权限模块：登录功能 */
    router.post('/api/v1/signin', sginIn )

    /**项目模块：新增项目 */
    router.post('/api/v1/create-project', createProject )
    /**项目模块：返回所有项目 */
    router.get('/api/v1/all-project', allProject )
    /**项目模块：返回项目详情 */
    router.get('/api/v1/project/:id', projectDetail )

    /**用户模块：查询所有符合条件的用户 */
    router.post('/api/v1/all-user', fetchAllUserByName )
}





async function getIndex( ctx ) {
    let a = fs.readFileSync('./dist/index.html', 'utf8');
    ctx.body = a;
}