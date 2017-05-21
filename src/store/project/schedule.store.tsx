import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

export class ProjectSchedule {

    private data$$: Observer<Schema.Schedule$>;
    public data$: Observable<Schema.Schedule$>;

    constructor( ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( );
        }).startWith( null )
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( ); 
    }

    public save( newData: Schema.Schedule$ ) {
        this.data$$.next( newData )
    }


}