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
import { appConfig } from './config/node.config';


const app = new Koa( );
const router = new KoaRouter( );
const server = http.createServer(app.callback( )).listen(appConfig.socketPort)
const io = SocketIo( server );
const db = Mongoose.connect(`${appConfig.dbIp}/${appConfig.dbTarget}`);;



setRouter( router )

db.connection.on('error',( e ) => {
    console.error(`数据库连接错误: ${e}`)
});
db.connection.on('open', ( ) => {
    console.log(`mongodb连接成功: ${appConfig.dbTarget}数据库`)
});

// io
//     .of('/chat')
//     .on('connection', function (socket) {
//         // socket.broadcast.emit('news', { hello: 'world' });
//         socket.join('cat')
//         socket.broadcast.in('cat').emit('news', { room: 'cat-1' });
//         socket.join('dog')
//         socket.broadcast.in('dog').emit('news', { room: 'dog-1' });
//         socket.emit('news', {hello: 'chat'})
//         socket.on('signIn', function (data) {
//             console.log(data);
//         }); 
//     });

io
    .of('/user')
    .on('connection', function (socket) {
        socket.on('signInUser', function (data) {
            console.log(data);
        }); 
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
