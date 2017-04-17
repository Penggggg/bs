import notification from '../../services/notification.service';
import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';


export default class UserSignIn {
    
    /**登录状态 */
    public signIn$$: Observer<boolean>;
    public signIn$: Observable<boolean>;

    /**登录状态初始化 */
    public initSignIn = ( ) => {

        let source = Observable.create(( o ) => { this.signIn$$ = o });
        let subject = new ReplaySubject( 1 );
        this.signIn$ = source.multicast( subject ).refCount( );
        this.signIn$.subscribe( );
    }


    /**登录状态发射 */
    public save = ( isSign: boolean ) => {
        if ( this.signIn$ === undefined ) { this.initSignIn( )}
        this.signIn$$.next( isSign );
    }

} 