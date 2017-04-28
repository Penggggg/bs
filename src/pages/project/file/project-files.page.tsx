import './project-files.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Icon, Button, Upload } from 'antd';


import userStore from '../../../store/user';
import projectStore from '../../../store/project';
import http from '../../../services/http.service';
import notification from '../../../services/notification.service';



export default class ProjectFilesPage extends React.PureComponent< IProps, IState > {

    private sub: Subscription;

    constructor( ) {
        super( );
        this.state = {
            uid: '',
            fileList: [ ]
        }
    }

    componentDidMount( ) {
        this.init( );
        this.combineFlow( );
    }

    componentWillUnmount( ) {
        this.sub.unsubscribe( );
    }

    init = ( ) => {
        let sub = userStore.data.userData$
            .do( user => {
                this.setState({
                    uid: user._id
                })
                setTimeout(( ) => sub.unsubscribe( ), 100)
            })
            .subscribe( )
    }

    onUpload = ( info ) => {
        if ( info.file.status === 'done' ) {
            notification.open({
                title: '消息',
                msg: '文件已成功上传'
            })
        } else if ( info.file.status === 'error' ) {
            notification.open({
                title: '消息',
                msg: '文件长传失败',
                type: 'error'
            })
        } 
    }

    combineFlow = ( ) => {

        let pid = this.props.params.id;

        this.sub = http.get<Array<APP.File>, API.Query.AllFiles>('/api/v1/all-files', { pid })
            .combineLatest(projectStore.file.data$)
            .do( res => {
               
                let { fileList } = this.state;
                let [ fromFetch, fromSOK ] = res;
                
                console.log( fromSOK )
                console.log( fromFetch )


                if ( !fromSOK ) {
                    // console.log('首次加载')
                    this.setState({
                        fileList: fromFetch
                    })
                } else {

                    /**fetch的时候是sort: -1 */
                    let lastFromFetch = fromFetch[ 0 ];

                    if ( fromFetch.length === 0 ) {
                        // console.log('首次数据来自于SOK')
                        return this.setState({
                            fileList: [ fromSOK ]
                        })
                    }

                    if ( fromSOK._id !== lastFromFetch._id ) {
                        // console.log('更新来自于SOK')
                        this.setState({
                            fileList: [ fromSOK, ...fileList  ]
                        })
                    } else {
                        // console.log('二次进入')
                        this.setState({
                            fileList: fromFetch
                        })
                    }

                }

            })
            .subscribe( )
    }

    render( ) {

        let { uid, fileList } = this.state;
        let { id } = this.props.params;

        let list = <ul>
            {
                fileList.map(( file, key ) => <li key={key}>
                    { file.fileName }
                    { file.user.name }
                    { (new Date( file.updatedTime )).toLocaleString( )}
                </li>)
            }
        </ul>

        return <div className="project-files-page">
            <div className="main-block">
                <div className="header">
                    <h3>文件库</h3>
                    <div className="upload-block">
                        <Upload action={`/api/v1/upload/${id}/${uid}`} onChange={ this.onUpload }>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </div>
                </div>
                <div className="content">
                    { list }
                </div>
            </div>
        </div>
    }

}

interface IProps  extends RouteComponentProps<{id: string}, {}>{

}

interface IState {
    uid: string
    fileList: Array<APP.File>
}