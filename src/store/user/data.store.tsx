import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

import { _IUser } from '../../interface/app.interface';

export default class UserData {

    private userData$$: Observer<_IUser>;
    public userData$: Observable<_IUser>;

    public save = ( user: _IUser ) => {
        /**首次保存 */
        if ( this.userData$ === undefined ) {
            this.init( user );
        } else {
            this.userData$$.next( user );
        }   
    }

    private init = ( user: _IUser ) => {

        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.userData$$ = observer;
            observer.next( user );
        })

        this.userData$ = source.multicast( subject ).refCount( );

    }



}