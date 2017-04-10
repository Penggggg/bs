import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

type Role = 'creator'|'leader'|'member';

export default class ProjecRole {


    private data$$: Observer<Role>;
    public data$: Observable<Role>;

    public save( role: Role ) {
        if ( this.data$ === undefined ) {
            this.init( role )
        } else {
            this.data$$.next( role )
        }
    }

    private init( role: Role ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( role );
        })

        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( );
    }

}