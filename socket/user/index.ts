

export default class UserSocket {

    private nameSpace = 'user';
    
    private eventSignIn = 'signInUser';
    private eventSignOut = 'signOutUser';

    /**sid-socket */
    private userSockets: {
        [ key: string ]: SocketIO.Socket
    } = { }

    /**uid-sid */
    private userMapSid: {
        [ key: string ]: string
    } = { }

    /**初始化 */
    public initIo = ( io: SocketIO.Server ) => {
        console.log('----------user socket启动成功------------')
        io
          .of(`${this.nameSpace}`)
          .on('connection', ( socket ) => {
              this.signIn( socket );
              this.signOut( socket );
          })
    }

    /**登录 */
    private signIn = ( socket: SocketIO.Socket ) => {
        socket.on(`${this.eventSignIn}`, ({ user }: SOK.Req.signIn ) => {
            console.log(`用户登录：${user.name}`)
            this.userMapSid[ user._id ] = socket.id;
            this.userSockets[ socket.id ] = socket;
        })
        socket.emit(`${this.eventSignIn}`, 
            {   msg: 'success', 
                status: '200'
            } as SOK.Res.signIn 
        )
    }

    /**登出 */
    private signOut = ( socket: SocketIO.Socket ) => {
        socket.on(`${this.eventSignOut}`, ({ user }: SOK.Req.signOut ) => {
            delete this.userSockets[ socket.id ];
        })
        socket.on('disconnect', ( ) => {

            console.log(`${socket.id} is disconnect`);

            delete this.userSockets[ socket.id ];

            for( let key of Object.keys( this.userMapSid )) {
                if ( socket.id === this.userMapSid[ key ]) {
                    delete this.userMapSid[ key ]
                }
            }

        })
    }

    public checkIsOnline = ( uid: string ) => {
        return this.userSockets[this.userMapSid[ uid ]] ? true : false;
    }

    public sendMsgTo = ( uid, msg: { eventName: string, content: object, type: number }) => {

        let socket = this.userSockets[this.userMapSid[ uid ]];
        socket.emit(`${msg.eventName}`, { type: msg.type, content: msg.content });
        console.log('转发成功')

    }

}

 