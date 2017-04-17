import { Subscription, Observable, ReplaySubject, Observer } from 'rxjs';

export default class MsgData {

    private data: Array<APP.Msg> = [ ];
    private data$$: Observer<Array<APP.Msg>>;
    public data$: Observable<Array<APP.Msg>>;

    public save = ( msg: APP.Msg | Array<APP.Msg> ) => {
        if ( this.data$ === undefined ) {
            this.init( );
        }
        if ( Array.isArray( msg )) {
            this.data.concat( msg );
        } else {
            this.data.push( msg );
        }
        this.data$$.next( this.data );
    }

    private init = ( ) => {

        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( o ) => {
            this.data$$ = o;
        })
        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( );
    }

}