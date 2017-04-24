import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';
import projectStore from '../../store/project';


export class EventProjectMember implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent<SOK.Res.NewMember>( io, `${CON.socketEvent.project.member}`)
            .do( res => {
                message.success( res.msg );
                projectStore.data.save( res.data );
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}