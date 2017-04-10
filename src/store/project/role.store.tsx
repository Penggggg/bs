import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

type TRole = 'creator'|'leader'|'member';

export default class ProjectRole {


    private data$$: Observer<TRole>;
    public data$: Observable<TRole>;

    public save( role: TRole ) {
        if ( this.data$ === undefined ) {
            this.init( role )
        } else {
            this.data$$.next( role )
        }
    }

    private init( role: TRole ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( role );
        })

        this.data$ = source.multicast( subject ).refCount( );
    }

}