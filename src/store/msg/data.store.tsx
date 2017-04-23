import { Subscription, Observable, ReplaySubject, Observer } from 'rxjs';


import userStore from '../../store/user';
import http from '../../services/http.service';
import { CON, ENUM, Util } from '../../index.con';

type dataType = {
        total: number,
        data: Array<Partial<APP.Msg>>
};

export default class MsgData {

    private data$$: Observer<dataType>;
    public data$: Observable<dataType>;

    constructor( ) {
        let subject = new ReplaySubject( 1 );
        let source = Observable.create(( o ) => {
            this.data$$ = o;
        }).startWith( null )

        this.data$ = source.multicast( subject ).refCount( );
        this.data$.subscribe( );
    }

    public save = ( msg: dataType  ) => {
        this.data$$.next( msg );
    }

    public refresh = ( ) => {

        let uid: string;
        let sub = userStore.data.userData$
            .do( user => uid = user._id )
            .do(( ) => setTimeout(( ) => Util.cancelSubscribe( sub ), 16 ))
            .subscribe( );

        http
            .post<API.Res.AllMsg, API.Query.AllMsg>('/api/v1/msg-list-fade', 
                { toUID: uid, readed: false, limit: 3, skip: 0 })
            .do( res => {
                this.save({
                    total: res.count,
                    data: res.data
                })
            })
            .subscribe( )

    }



}