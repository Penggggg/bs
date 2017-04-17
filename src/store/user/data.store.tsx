import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';



export default class UserData {

    private userData$$: Observer<APP.User>;
    public userData$: Observable<APP.User>;

    public save = ( user: APP.User ) => {
        /**首次保存 */
        if ( this.userData$ === undefined ) {
            this.init( user );
        } else {
            this.userData$$.next( user );
        }   
    }

    private init = ( user: APP.User ) => {

        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.userData$$ = observer;
            observer.next( user );
        })

        this.userData$ = source.multicast( subject ).refCount( );

    }



}