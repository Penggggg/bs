import * as Koa from 'koa';
import * as path from 'path';
import * as KoaRouter from 'koa-router';
import * as KoaBody from 'koa-bodyparser';
import * as KoaLog from 'koa-logs-full';
import * as Mongoose from 'mongoose';

import setRouter from './controller';
import { appConfig } from './config/node.config';


const app = new Koa( );
const router = new KoaRouter( );
const db = Mongoose.connect(`mongodb://localhost/${appConfig.dbTarget}`)



setRouter( router )

db.connection.on('error',( ) => {
    console.error('数据库连接错误:')
});
db.connection.on('open', ( ) => {
    console.log(`mongodb连接成功: ${appConfig.dbTarget}数据库`)
});


app
  .use(KoaLog( app,{
      logdir: path.join( __dirname, 'logs')
  }))
  .use(KoaBody( ))
  .use(router.routes( ))
  .use(router.allowedMethods( ))

app.listen( appConfig.nodePort )
console.log(`app is running in ${appConfig.nodePort}`)