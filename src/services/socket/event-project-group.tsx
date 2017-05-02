import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';
import projectStore from '../../store/project';

export class EventProjectGroup implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent( io, `${CON.socketEvent.project.group}`)
            .do( res => {
                console.log('????')
                // message.success('项目状态有更新~');
                projectStore.group.save( );
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}