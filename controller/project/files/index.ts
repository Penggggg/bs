import * as fs from 'fs';
import * as Koa from 'koa';
import * as path from 'path';
import * as asyncBusboy from 'async-busboy';

import socketService from '../../../socket';
import userModel from '../../../model/models/user.model';
import { FileModel } from '../../../model/models/file.model';

export let upload = async( ctx: Koa.Context ) => {

    let { pid, uid } = ctx.params;
    const { files, fields } = await asyncBusboy( ctx.req );

    let uploadFile = files[ 0 ];

    /**判断并生成项目文件夹 */
    let existdDir = await fs.existsSync(`uploads/${pid}`);

    if ( !existdDir ) {
        let mkdir = await fs.mkdirSync(`uploads/${pid}`)
    }


    // uploadFile.setEncoding('utf8');
    let fileName =  uploadFile.filename;


    /**2-1. 判断是否已存在该文件 */
    let existedFile = await fs.existsSync(`uploads/${pid}/${fileName}`)


    /**2-2. 不存在 */
    if ( !existedFile ) {
        /**2-2-1. 保存到数据库 */
        let save: Schema.File = await FileModel.save({ pid, uid, fileName } as Schema.File );

        /**2-2-2. 查询user */
        let userData: Array<Partial<APP.User>>= await userModel.customFind({ _id: uid }, 'name', null );
        
        /**2-2-3. socket转发 */
        let sokData: APP.File = {
            _id: save._id,
            pid: save.pid,
            fileName: save.fileName,
            updatedTime: save.updatedTime,
            user: userData[0]
        }

        socketService.projectSockets[pid].file.broadcast( sokData );
    } else {
        /**2-3. 已存在 */
        FileModel.myUpdate( fileName )
    }

    /**last. 上传到服务器文件夹 */
    uploadFile.pipe(fs.createWriteStream(`uploads/${pid}/${fileName}`))


    ctx.body = 'ok';


}


export let download = async( ctx: Koa.Context ) => {

    let { pid, fileName } = ctx.query;

    let filePath = path.join( __dirname, '../../../uploads', pid, fileName );
    let stats = await fs.statSync( filePath );

    if ( stats.isFile( )) {

        ctx.set({
            'Content-Disposition': `attachment; filename=${fileName}`,
            'Content-Length': `${stats.size}`
        })

        let data = await fs.readFileSync( filePath );

        return ctx.body = data;
    }

    ctx.body = '无可返回文件'
}


export let allFiles = async( ctx: Koa.Context ) => {

    let { pid } = ctx.query as API.Query.AllFiles;

    let data: Array<Schema.File$> = await FileModel.customFind({ pid }, null, { sort: [{"_id": -1 }]} );

    let result: Array<APP.File> = data.map(({ _id, pid, fileName, updatedTime, uid }) =>({
        _id,
        pid,
        fileName,
        updatedTime,
        user: uid
    }))

    ctx.body = result;
}