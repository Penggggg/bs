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
