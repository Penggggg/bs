
import { CON } from '../../index.con';

export class Schedule {

    private io: SocketIO.Namespace

    constructor( io: SocketIO.Namespace ) {
        this.io = io;
    }

    public broadcast( arg ) {
        this.io.emit(`${CON.socketEvent.project.schedule}`, arg )
    }

}