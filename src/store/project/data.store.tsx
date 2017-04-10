import { Observable, Observer, Subject, ReplaySubject, Subscription } from 'rxjs';

import { IProject } from '../../interface/app.interface';

export default class ProjectData {

    private data$$: Observer<IProject>;
    public data$: Observable<IProject>;

    public save( project: IProject ) {
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