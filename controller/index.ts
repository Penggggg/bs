import * as fs from 'fs';
import * as path from 'path';
import * as Koa from 'koa';
import * as body from 'koa-better-body';

import { login } from './auth/login';
import { resetPsw } from './auth/reset';
import { sginIn } from './auth/signin';
import { addChat } from './project/chat/add-chat';
import { inviteMember } from './project/invite-member'; 
import { getChatList } from './project/chat/query-chat';
import { createProject } from './project/create-project';
import { replyInvite } from './project/reply-invite';
import { download, upload, allFiles } from './files';
import { fetchAllUserByName } from './user/query.controller';
import { allProject, projectDetail } from './project/query-project';
import { fetchAllMsgList, fetchFadeMsgList, fetchMsgDetail } from './msg/query-msg';


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
    /**项目模块：邀请成员 */
    router.post('/api/v1/invite-member', inviteMember )
    /**项目模块：回应邀请 */
    router.post('/api/v1/reply-invite', replyInvite )
    /**项目模块：增加聊天记录 */
    router.post('/api/v1/chat-record', addChat );
    router.get('/api/v1/chat-list', getChatList );


    /**用户模块：查询所有符合条件的用户 */
    router.post('/api/v1/all-user', fetchAllUserByName )


    /**消息模块：查询所有符合条件的消息 */
    router.post('/api/v1/msg-list', fetchAllMsgList );
    /**消息模块：所有消息的伪查询 */
    router.post('/api/v1/msg-list-fade', fetchFadeMsgList );
    /**消息模块 */
    router.get('/api/v1/msg-detail', fetchMsgDetail );


    /**文件模块：下载 */
    router.get('/api/v1/files/:fileName', download );
    /**文件模块：上传 */
    router.post('/api/v1/upload/:pid/:uid', upload );
    /**文件模块：查询 */
    router.get('/api/v1/all-files', allFiles )


}




async function getIndex( ctx ) {
    let a = fs.readFileSync('./dist/index.html', 'utf8');
    ctx.body = a;
}