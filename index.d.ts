

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

        /**GET：查询所有文件 */
        export interface AllFiles {
            data: Array<APP.File>
        }

        /**GET：删除文件 */
        export interface DeleteFile {
            msg: string,
            status: '200' | '400' | '500'
        }

        /**POST：增加任务聊天 */
        export interface AddNewTaskTalk {
            data: Schema.Task$,
            status: '200' | '400' | '500'
        }

        /**POST：更新任务内容 */
        export interface UpdateTaskContent {
            data: Schema.Task$,
            status: '200' | '400' | '500'        
        }

        /**POST：新建任务的子任务 */
        export interface AddChildTask {
            data: Schema.Task$,
            status: '200' | '400' | '500'  
        }

        /**POST：更新子任务状态 */
        export interface UpdateChildTask {
            data: Schema.Task$,
            status: '200' | '400' | '500'  
        }

        /**POST：更改任务截止日期 */
        export interface UpdateDeadline {
            data: Schema.Task$,
            status: '200' | '400' | '500'  
        }

        /**POST：更改任务优先级 */
        export interface UpdatePriority {
            data: Schema.Task$,
            status: '200' | '400' | '500'  
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

        /**GET：查询所有文件 */
        export interface AllFiles {
            pid: string
        }

        /**GET：删除文件 */
        export interface DeleteFile {
            pid: string
            fileName: string
        }

        /**GET：某项目下所有成员以及组长 */
        export interface AllMemberLeader {
            pid: string
        }

        /**POST：项目新增分组 */
        export interface AddNewGroup {
            pid: string
            touid: Array<string>
            fromuid: string
            groupName: string
        }

        /**POST：增加任务 */
        export interface AddNewTask extends Partial<Schema.Task> {
            pid: string
        }

        /**POST：增加任务聊天 */
        export interface AddNewTaskTalk extends Partial<Schema.TaskTalk> {
            pid: string
        }

        /**POST：更新任务内容 */
        export interface UpdateTaskContent extends Partial<Schema.Task> {
            pid: string
        }

        /**POST：新建任务的子任务 */
        export interface AddChildTask extends Partial<Schema.ChildTask> {
            pid: string
        }

        /**POST：更新子任务状态 */
        export interface UpdateChildTask extends Partial<Schema.ChildTask> {
            pid: string
            taskID: string
        }

        /**POST：更改任务截止日期 */
        export interface UpdateDeadline extends Partial<Schema.Task> {
            
        }

        /**POST：更改任务优先级 */
        export interface UpdatePriority extends Partial<Schema.Task> {
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
            _id: string
            uid: string
            content: string
            userName: string
            createdTime: string
        }

        /**消息推送：新增文件 */
        export interface NewFile extends APP.File {  }
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
        group: Array<APP.Group>
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
            uid: string
            content: string
            createdTime: string
        }>
    }

    /**文件 */
    export interface File {
        _id: string
        pid: string
        fileName: string
        updatedTime: string
        user: Partial<APP.User>
    }

    /**单条聊天记录 */
    export interface SingleChat {
        content: string
        createdTime: string
        uid: string | APP.User
        pid: string | APP.Project
    }


    /**子任务 */
    export interface ChildTask {
        _id?: string
        content: string
        taskID: string
        finished: boolean
        creatorID: string
        createdTime: string
    }

    /**任务留言 */
    export interface TaskTalk {
        _id?: string
        taskID: string
        content: string
        creator: APP.User
        createdTime: string
    }

    /**任务 */
    export interface Task {
        _id?: string
        title: string
        content: string
        priority: number
        deadLine: string
        finished: boolean
        groupID: string
        creatorID: string
        createdTime: string
        executors: Array<APP.User>
        taskTalks: Array<APP.TaskTalk>
        childTasks: Array<APP.ChildTask> 
    }

    /**分组 */
    export interface Group {
        _id?: string
        pid: string
        creatorID: string
        groupName: string
        tasks: Array<APP.Task>
        leaders: Array<APP.User>
    }

}

declare namespace Schema {

    export interface File {
        _id: string
        uid: string
        pid: string
        fileName: string
        updatedTime?: string
    }

    export interface File$ {
        _id: string
        pid: string
        fileName: string
        updatedTime: string
        uid: Partial<APP.User>
    }

    export interface Project {
        _id?: string
        name: string
        info: string
        cover: string
        creator: string
        group: Array<string>
        leader: Array<string>
        member: Array<string>
        meta: {
            createdTime: string
            updatedTime: string
        }
    }

    export interface Project$ {
        name: string
        info: string
        cover: string
        creator: APP.User
        group: Schema.Group
        leader: Array<APP.User>
        member: Array<APP.User>
        meta: {
            createdTime: string
            updatedTime: string
        } 
    }

    export interface Group {
        _id?: string
        pid: string
        creatorID: string
        groupName: string
        tasksID?: Array<string>
        leadersID: Array<string>
    }

    export interface Group$ {
        _id?: string
        pid: string
        creatorID: APP.User
        groupName: string
        tasksID?: Array<Schema.Task$>
        leadersID: Array<APP.User>
    }

    export interface Task {
        _id?: string
        title: string
        content: string
        priority: number
        deadLine: string
        finished: boolean
        groupID: string
        creatorID: string
        createdTime: string
        executorsID: Array<string>
        taskTalksID: Array<string>
        childTasksID: Array<string>
    }

    export interface Task$ {
        _id?: string
        title: string
        content: string
        priority: number
        deadLine: string
        finished: boolean
        groupID: Schema.Group$
        creatorID: APP.User
        createdTime: string
        executorsID: Array<APP.User>
        taskTalksID: Array<Schema.TaskTalk$>
        childTasksID: Array<Schema.ChildTask$> 
    }

    export interface TaskTalk {
        _id?: string
        taskID: string
        content: string
        creatorID: string
        createdTime: string
    }

    export interface TaskTalk$ {
        _id?: string
        taskID: string
        content: string
        creatorID: APP.User
        createdTime: string
    }

    export interface ChildTask {
        _id?: string
        content: string
        taskID: string
        finished: boolean
        creatorID: string
        createdTime: string
    }

    export interface ChildTask$ {
        _id?: string
        content: string
        taskID: string
        finished: boolean
        creatorID: string
        createdTime: string
    }

}

/**webpack2 import */
declare var System: {
    import: ( filename: string ) => Promise<any>
}

/**socket.io client */
declare var io: any