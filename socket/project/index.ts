

export class ProjectSocket {

    private pid: string;
    private io: SocketIO.Server;


    constructor( io: SocketIO.Server ,pid: string ) {
        console.log(`--------project-socket启动成功: ${pid}`)
        this.io = io;
        this.pid = pid;
        this.init( io, pid );
    }

    private init( io: SocketIO.Server ,pid: string ) {
        io  
            .of(`${pid}`)
            .on('connection', ( socket ) => {
                console.log(`有人进入了项目${pid}`)
            })
    }

}