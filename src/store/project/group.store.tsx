import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

export class ProjectGroup {

    private data$$: Observer<any>;
    public data$: Observable<any>;

    constructor( ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( );
        }).startWith( null )
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( ); 
    }

    public save( ) {
        this.data$$.next( 1 )
    }


}