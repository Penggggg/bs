import { Subscription, Observable, ReplaySubject, Observer } from 'rxjs';

export default class MsgData {

    private data$$: Observer<Partial<APP.Msg>>;
    public data$: Observable<Partial<APP.Msg>>;

    constructor( ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( o ) => {
            this.data$$ = o;
        })
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( );
    }

    public save = ( msg: Partial<APP.Msg>  ) => {
        this.data$$.next( msg );
    }


}