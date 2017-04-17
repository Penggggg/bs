import { _IUser } from '../../interface/app.interface';
import { _ISocketSignIn, ISocketSignIn_, _ISocketSignOut } from '../../interface/socket.interface';

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
        io
          .of(`${this.nameSpace}`)
          .on('connection', ( socket ) => {
              this.signIn( socket );
              this.signOut( socket );
          })
    }

    /**登录 */
    private signIn = ( socket: SocketIO.Socket ) => {
        socket.on(`${this.eventSignIn}`, ({ user }: _ISocketSignIn ) => {
            console.log(`用户登录：${user.name}`)
            this.userMapSid[ user._id ] = socket.id;
            this.userSockets[ socket.id ] = socket;
        })
        socket.emit(`${this.eventSignIn}`, 
            {   msg: 'success', 
                status: '200'
            } as ISocketSignIn_ 
        )
    }

    /**登出 */
    private signOut = ( socket: SocketIO.Socket ) => {
        socket.on(`${this.eventSignOut}`, ({ user }: _ISocketSignOut ) => {
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

    public sendMsgTo = ( uid, msg: { eventName: string, content: object }) => {

    }

}

 