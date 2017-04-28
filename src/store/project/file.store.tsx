import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

export class ProjectFile {

    private data$$: Observer<SOK.Res.NewFile>;
    public data$: Observable<SOK.Res.NewFile>;

    constructor( ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( );
        }).startWith( null )
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( ); 
    }

    public save( newFile: SOK.Res.NewFile ) {
        this.data$$.next( newFile )
    }


}