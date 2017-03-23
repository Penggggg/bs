


export namespace myNotification {

    export interface INotificationService {
        open( obj: IOpenArguments ): void
    }

    export interface IOpenArguments {
        title: string
        msg: string
        type?: 'ok' | 'error'
    }
    
}