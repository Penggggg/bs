
class localStorageService {

    /**ls服务：根据key获取value */
    public getItem = ( key: string ) => JSON.parse(localStorage.getItem( key ))

    /**ls服务：配置key-value */
    public setItem = ( key: string, value: string | Object ) => {
        if ( typeof value === 'string' ) {
            localStorage.setItem( key, value )
        } else {
            localStorage.setItem( key, JSON.stringify( value ))
        }
    }


    /**ls服务：清空某项 */
    public cleanItem = ( key: string ) => localStorage.removeItem( key )

    /**ls服务：清空全部 */
    public cleanAll = ( ) => localStorage.clear( )

}

export default new localStorageService( );