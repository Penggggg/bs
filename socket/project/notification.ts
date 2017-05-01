
import { CON } from '../../index.con';

export class Notification {

    private io: SocketIO.Namespace

    constructor( io: SocketIO.Namespace ) {
        this.io = io;
    }

    public broadcast( arg: { msg: string } ) {
        this.io.emit(`${CON.socketEvent.project.notification}`, { ...arg })
    }

}