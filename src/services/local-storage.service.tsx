
class localStorageService {

    /**ls服务：根据key获取value */
    public getItem = ( key: string ) => localStorage.getItem( key )

    /**ls服务：配置key-value */
    public setItem = ( key: string, value: string ) => localStorage.setItem( key, value )

    /**ls服务：清空某项 */
    public cleanItem = ( key: string ) => localStorage.removeItem( key )

    /**ls服务：清空全部 */
    public cleanAll = ( ) => localStorage.clear( )

}

export default new localStorageService( );