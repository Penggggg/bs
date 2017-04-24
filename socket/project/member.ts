
import { CON } from '../../index.con';

export class Member {

    private io: SocketIO.Namespace

    constructor( io: SocketIO.Namespace ) {
        this.io = io;
    }

    public broadcast( arg: SOK.Res.NewMember ) {
        this.io.emit(`${CON.socketEvent.project.member}`, { msg: arg.msg, data: arg.data })
    }

}