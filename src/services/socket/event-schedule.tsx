import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';
import projectStore from '../../store/project';

export class EventProjectSchedule implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent( io, `${CON.socketEvent.project.schedule}`)
            .do(( res: Schema.Schedule$ ) => {
                message.success('项目新增一条日程!');
                projectStore.schedule.save( res )
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}