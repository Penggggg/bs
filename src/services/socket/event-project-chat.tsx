import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';
import projectStore from '../../store/project';

export class EventProjectChat implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent<SOK.Res.NewChat>( io, `${CON.socketEvent.project.chat}`)
            .do( res => {
                message.success('项目有一条新聊天记录~');
                projectStore.chat.save( res );
                // console.log( res )
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}