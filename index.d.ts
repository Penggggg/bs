

declare namespace API {

    export namespace Res {

        /**POST：用户登录 */
        export interface SignIn {
            msg: 'user is not existed' | 'psw not right' | 'server err' | 'success'
            status: '4001' | '4002' | '200' | '500'
            user: APP.User 
        }

        /**POST：忘记密码 */
        export interface ResetPsw {
            msg: 'user is not existed' | 'phone not right' | 'psw not equal' | 'server err' | 'success'
            status: '4001' | '4002' | '4003' | '200' | '500'
        }

        /**POST：用户注册 */
        export interface Login {
            msg: 'psw not equal' | 'success' | 'server err' | 'user has been existed',
            status: '4001'| '4002' | '500' | '200',
            user?: APP.User
        }

        /**POST：项目成员邀请 */
        export interface InviteMember {
            msg: string,
            status: '200' | '500'
        }

        /**POST：新增项目 */
        export interface CreateProject {
            msg: 'success' | 'server error',
            status: '200' | '500'
        }

        /**GET：项目列表 */
        export interface AllProject {
            data: Array<APP.Project>
        }

        /**POST：消息列表--伪查询，返回列表长度，及最新的3位数据 */
        export interface AllMsg {
            count: number
            data: Array<Partial<APP.Msg>>
        }

        /**GET：消息详情 */
        export interface MsgDetail extends APP.Msg {

        }

        /**POST：回应项目邀请 */
        export interface ReplyInvite {
            msg: string
            status: '200' | '400' | '500'
        }

        /**POST：发送聊天 */
        export interface AddChatRecord {
            msg: string,
            status: '200' | '500' | '400'
        }

        /**GET：查询聊天记录 */
        export interface ProjectChat {
            data: Array<{
                content: string
                createdTime: string
                user: Partial<APP.User>
            }>
        }


    }

    export namespace Req {

    }

    export namespace Query {

        /**POST：用户登录 */
        export interface SignIn {
            signPhone: string
            signPsw: string
        }

        /**POST：忘记密码 */
        export interface ResetPsw {
            resetUserName: string
            reseUserPhone: string
            resetPsw: string
            resetPsw2: string
        }

        /**POST：用户注册 */
        export interface Login {
            userName: string
            userPhone: string 
            password: string
            password2: string        
        }

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

        /**POST：新增项目 */
        export interface CreateProject {
            projectName: string
            projectInfo: string
            creatorID: string
        }

        /**POST：消息列表--伪查询，返回列表长度，及最新的3位数据 */
        export interface AllMsg extends Partial<APP.Msg> {
            limit: number | null
            skip: number | null
        }

        /**GET：消息详情 */
        export interface MsgDetail {
            id: string
        }

        /**POST：回应项目邀请 */
        export interface ReplyInvite {
            answer: boolean
            mid: string | Partial<APP.Msg>
        }

        /**POST：发送聊天 */
        export interface AddChatRecord {
            pid: string,
            uid: string,
            content: string
        }

        /**GET：查询聊天记录 */
        export interface ProjectChat {
            pid: string
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
            _id: string
            content: string
            title: string
            readed: boolean
            meta: {
                createdTime: string
            }
        }

        /**消息推送：成员邀请 */
        export interface MsgInvite extends Msg {
            content: MsgInviteContent
        }

        /**消息推送：项目socket链接成功 */
        export interface getInProject {
            msg: string
        }

        /**消息推送：项目成员加入成功 */
        export interface NewMember {
            msg: string,
            data: APP.Project
        }

        /**消息推送：新增聊天记录 */
        export interface NewChat {
            uid: string
            content: string
            userName: string
            createdTime: string
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
    export interface Msg  {
        _id?: string
        dirty: boolean
        readed: boolean
        title: string
        formType: number
        replyURL: string
        meta?: {
            createdTime: string
        }
        fromUID: Partial<APP.User>
        toUID: Partial<APP.User>
        type: number
        content: string,
        PID: Partial<APP.Project>
    }

    /**聊天记录列表 */
    export interface ChatList {
        pid?: string
        record: Array<{
            uid: string | APP.User
            content: string
            createdTime: string
        }>
    }


}



/**webpack2 import */
declare var System: {
    import: ( filename: string ) => Promise<any>
}

/**socket.io client */
declare var io: any