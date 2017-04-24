import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';


export class EventProjectGetIn implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent<SOK.Res.getInProject>( io, `${CON.socketEvent.project.getIn}`)
            .do( res => {
                message.success(res.msg);
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}