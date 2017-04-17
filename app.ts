/// <reference path="index.d.ts" />

import * as Koa from 'koa';
import * as path from 'path';
import * as http from 'http';
import * as KoaRouter from 'koa-router';
import * as KoaBody from 'koa-bodyparser';
import * as KoaLog from 'koa-logs-full';
import * as Mongoose from 'mongoose';
import * as KoaServer from "koa-static2";
import * as SocketIo from 'socket.io';

import setRouter from './controller';
import SocketServer from './socket';
import { appConfig } from './config/node.config';


const app = new Koa( );
const router = new KoaRouter( );
const server = http.createServer(app.callback( )).listen(appConfig.socketPort)
const io = SocketIo( server );
const db = Mongoose.connect(`${appConfig.dbIp}/${appConfig.dbTarget}`);;



setRouter( router );
SocketServer.init( io )


db.connection.on('error',( e ) => {
    console.error(`数据库连接错误: ${e}`)
});
db.connection.on('open', ( ) => {
    console.log(`mongodb连接成功: ${appConfig.dbTarget}数据库`)
});


app
  .use(KoaLog( app,{
      logdir: path.join( __dirname, 'logs')
  }))
  .use(KoaServer("static", __dirname + '/dist'))
  .use(KoaBody( ))
  .use(router.routes( ))
  .use(router.allowedMethods( ))


app.listen( appConfig.nodePort )
console.log(`app is running in ${appConfig.nodePort}`)
console.log(`app's NODE_ENV is ${process.env.NODE_ENV}`)
