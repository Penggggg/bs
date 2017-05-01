import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';

export class EventProjectNotification implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent( io, `${CON.socketEvent.project.notification}`)
            .do(( res: any ) => {
                message.success(res.msg);
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}