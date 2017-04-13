/**global environment  */
// declare var process:{
//     env: {
//         NODE_ENV: string
//     }
// } 

/**webpack2 import */
declare var System: {
    import: ( filename: string ) => Promise<any>
}

/**socket.io client */
declare var io: any


declare enum MsgType {
    invitateMember = 1
} 
