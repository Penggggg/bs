
import { CON } from '../../index.con';

export class File {

    private io: SocketIO.Namespace

    constructor( io: SocketIO.Namespace ) {
        this.io = io;
    }

    public broadcast( arg: SOK.Res.NewFile ) {
        this.io.emit(`${CON.socketEvent.project.file}`, { ...arg })
    }

}