import { _IUser } from '../../interface/app.interface';
import { _ISocketSignIn, ISocketSignIn_, _ISocketSignOut } from '../../interface/socket.interface';

class UserSocket {

    private nameSpace = 'user';
    private eventSignIn = 'signInUser';
    private eventSignOut = 'signOutUser';

    private userSockets: {
        [ key: string ]: SocketIO.Socket
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
            this.userSockets[user.phone] = socket;
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
            delete this.userSockets[user.phone];
        })
        socket.on('disconnect', ( ) => {
            console.log('disconnect');
        })
    }

}

export default new UserSocket( );