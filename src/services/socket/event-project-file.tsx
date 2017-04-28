import { message } from 'antd';
import { Observable, Subscription } from 'rxjs';

import { CON } from '../../index.con';
import projectStore from '../../store/project';

export class EventProjectFile implements APP.ProjectEvent {

    private sub: Subscription;

    constructor( io: SocketIO.Socket ) {
        this.init( io );
    }

    private init( io: SocketIO.Socket ) {
        this.sub = Observable
            .fromEvent<SOK.Res.NewFile>( io, `${CON.socketEvent.project.file}`)
            .do( res => {
                message.success('项目增加一个新文件~');
                projectStore.file.save( res );
            })
            .subscribe( );
    }

    public cancelSub( ) {
        this.sub.unsubscribe( );
    }

}