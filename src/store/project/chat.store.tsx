import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

export class ProjectChat {

    private data$$: Observer<SOK.Res.NewChat>;
    public data$: Observable<SOK.Res.NewChat>;

    constructor( ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( observer ) => {
            this.data$$ = observer;
            observer.next( );
        })
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( ); 
    }

    public save( newChat: SOK.Res.NewChat ) {
        this.data$$.next( newChat )
    }


}