

declare namespace API {

    export namespace Res {

        /**POST：项目成员邀请 */
        export interface InviteMember {
            msg: string,
            status: '200' | '500'
        }

    }

    export namespace Req {
        
    }

    export namespace Query {

        /**POST：符合条件的所有用户 */
        export interface AllUser {
            name: string
        }

        /**POST：项目成员邀请 */
        export interface InviteMember {
            fromUID: string
            toUID: string
            type: number
            content: string,
            PID: string
        }

    }

}


declare namespace SOK {
    
    export namespace Res {

        interface Msg {
            type: number
        }


        /**登录 */
        export interface signIn {
            msg: 'success' | 'error',
            status: '200'
        }

        /**消息推送：成员邀请content内容 */
        export interface MsgInviteContent {
            msgId: string,
            content: string,
            title: string,
            readed: boolean
        }

        /**消息推送：成员邀请 */
        export interface MsgInvite extends Msg {
            content: MsgInviteContent
        }

    }

    export namespace Req {

        /**登录 */
        export interface signIn {
            user: APP.User
        }  

        /**登出 */
        export interface signOut {
            user: APP.User
        }

    }

}

declare namespace APP {

    /**用户信息 */
    export interface User {
        _id: string
        name: string,
        phone: string,
        meta?: {
            createdTime: string
            updatedTime: string
        }
    }

    /**项目信息 */
    export interface Project {
        _id: string
        name: string
        info: string
        cover: string
        creator: User
        member: Array<User>
        leader: Array<User>
        meta?: {
            createdTime: string
            updatedTime: string
        }
    }

    /**消息 */
    export interface Msg extends API.Query.InviteMember {
        _id?: string
        dirty: boolean
        readed: boolean
        title: string
        formType: number
        replyURL: string
    }

}






/**webpack2 import */
declare var System: {
    import: ( filename: string ) => Promise<any>
}

/**socket.io client */
declare var io: any