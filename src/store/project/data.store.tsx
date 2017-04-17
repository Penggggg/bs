import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

export default class ProjectData {

    private data$$: Observer<APP.Project>;
    public data$: Observable<APP.Project>;

    public save( project: APP.Project ) {
        if ( this.data$ === undefined ) {
            this.init( project )
        } else {
            this.data$$.next( project )
        }
    }

    private init( project ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( project );
        })
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( );
    }

}