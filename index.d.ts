


declare namespace API {

    export namespace Res {

        /**GET: 所有用户 */
        export type AllUser = Array<APP.User>

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

}