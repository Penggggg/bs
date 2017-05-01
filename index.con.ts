
export namespace CON {

    /**socket事件名称 */
    export namespace socketEvent {

        /**登录 */
        export const signIn = 'signInUser';
        /**登出 */
        export const signOut = 'signOutUser';
        /**消息 */
        export const msg = 'msg';
        /**项目事件 */
        export namespace project {

            /**进入项目 */
            export const getIn = 'getInProject'

            /**成员 */
            export const member = 'member'

            /**聊天信息 */
            export const chat = 'chat'

            /**文件信息 */
            export const file = 'file'

            /**任务组别 */
            export const group = "group";

            /**通知 */
            export const notification = 'notification';
        }
    }

    /**socket命名空间 */
    export namespace socketNSP {

        export const user = 'user';
    }

}


export namespace ENUM {

    export const enum MsgType {
        InviteMember = 1, 
        GroupLeader 
    }

    export const enum MsgFormType {
        noForm = 1,
        twoChoice, 
        Confirm
    }

}


export namespace Util {


    export let cancelSubscribe = ( ...subscritions ) => {
        setTimeout(( ) => {
            subscritions.map(( sub ) => {
                sub.unsubscribe( );
            })
        }, 300 );
    }

}