
export namespace CON {

    /**socket事件名称 */
    export namespace socketEvent {

        export const signIn = 'signInUser';
        export const signOut = 'signOutUser';
        export const msg = 'msg';
    }

    /**socket命名空间 */
    export namespace socketNSP {

        export const user = 'user';
    }

}


export namespace ENUM {

    export const enum MsgType {
        InviteMember = 1
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