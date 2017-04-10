import UserSignIn from './signIn.store';
import UserData from './data.store';

class UserStore {

    public signIn = new UserSignIn( );
    public data = new UserData( );

}

export default new UserStore( );

