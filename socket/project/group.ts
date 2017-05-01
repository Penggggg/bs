
import { CON } from '../../index.con';

export class Group {

    private io: SocketIO.Namespace

    constructor( io: SocketIO.Namespace ) {
        this.io = io;
    }

    public broadcast(  ) {
        this.io.emit(`${CON.socketEvent.project.group}`, { })
    }

}