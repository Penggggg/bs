import { Observable, Observer, Subscription } from 'rxjs';
import clientConfig from './../config';

class HttpService {

    private TIMEOUT = 10000;
    private sub: Subscription;

    private getXhr( ) {
        return new XMLHttpRequest( );
    }
    
    public get<T>( url: string, opt?: object ): Observable<T> {

        /**变量声明 */
        let data$$: Observer<T>;
        let xhr = this.getXhr( );

        /**数据源 */
        let data$: Observable<any> = Observable.create(( observer ) => {
             data$$ = observer;
        }).share( )

        this.sub = data$.subscribe( );

        /**异步事件设置 */
        this.decorateXHR( xhr, data$$ );    

        /**整合查询串 */
        url += this.turnObjToQuery( opt );

        /**开启xhr */
        xhr.open( 'GEt', `${clientConfig.reqURL}${url}`, true );

        xhr.send( );
        console.info(`sending http-GET: ${url}`);

        return data$;
    }

    public post<T>( url: string, queryOpt: Object ): Observable<T> {
  
        /**变量声明 */
        let postBody: string;
        let data$$: Observer<any>;
        let xhr = this.getXhr( );

        /**数据源 */
        let data$: Observable<any> = Observable.create(( observer ) => {
             data$$ = observer;
        }).share( )
        
        data$.subscribe( );
        
        /**异步事件设置 */
        this.decorateXHR( xhr, data$$ );

        /**拼接查村串 */
        // postBody = queryOpt ? this.setPostBody( queryOpt ) : '';

        /**开启xhr */
        xhr.open( 'POST', `${clientConfig.reqURL}${url}`, true );

        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // xhr.send( postBody );

        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(JSON.stringify( queryOpt ));

        console.info(`sending http-POST: ${url}`);

        return data$;
    }

    private decorateXHR( xhr: XMLHttpRequest, data$$: Observer<any> ) {

        /**异步错误获取 */
        xhr.onerror = err => {
            data$$.error( err );
            this.closeConnection( xhr, data$$ )
        }

        /**超时设置 */
        xhr.timeout = this.TIMEOUT;
        xhr.ontimeout = ($event) => { 
            data$$.error('http请求超时');
            this.closeConnection( xhr, data$$ )
        }

        /**异步状态判断 */
        xhr.onreadystatechange = ( ) => {

            /**变量声明 */
            let readyState = xhr.readyState;
            let status = `${xhr.status}`;

            /**准备就绪 */
            if ( readyState === 4 ) {
                this.sub.unsubscribe( );
                /**成功：2**、3** */
                if ( status.indexOf('2') === 0 || status.indexOf('3') === 0 ) {
                    let resObj = { };
                    try { 
                        resObj = JSON.parse(`${xhr.responseText}`);
                        data$$.next( resObj ); 
                    } catch( e ) { 
                        data$$.error( e );
                        data$$.complete( );
                    } 

                    /**客户端、服务端错误 */
                } else if ( status.indexOf('4') === 0 || status.indexOf('0') === 0 || status.indexOf('5') === 0 ) {
                    data$$.error( status );
                    data$$.complete( );
                } else {
                    data$$.error( status )
                    data$$.complete( );
                }

            }
        }

    }

    private closeConnection( xhr: XMLHttpRequest, data$$: Observer<any> ) {
        xhr.abort( );
        data$$.complete( );
        this.sub.unsubscribe( );
    }

    private setGetUrlWithQuery( url: string, query: Object ): string {
        url += '?';
        Object.keys( query ).map( key => {
            url += `${key}=${query[key]}&`
        })
        return url.substring(0,url.length-1);
    }

    private turnObjToQuery( query: Object ): string {
        if ( !query ) return '';
        let body = '';
        Object.keys( query ).map( key => {
            body += `${key}=${query[key]}&`
        })
        return body;
    }

}


export default new HttpService( );