import './project-files.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Icon, Button, Upload, Spin, Table, Modal, message } from 'antd';


import userStore from '../../../store/user';
import projectStore from '../../../store/project';
import http from '../../../services/http.service';
import notification from '../../../services/notification.service';

interface K extends APP.File {
    key: number
}

export default class ProjectFilesPage extends React.PureComponent< IProps, IState > {

    private columns: any;
    private sub: Subscription;

    constructor( ) {
        super( );
        this.state = {
            uid: '',
            loading: true,
            dataSource: [ ]
        }
    }

    componentDidMount( ) {
        this.init( );
        this.initCol( );
        this.combineFlow( );
    }

    componentWillUnmount( ) {
        this.sub.unsubscribe( );
    }

    init = ( ) => {
         this.sub = userStore.data.userData$
            .do( user => {
                this.setState({
                    uid: user._id
                })
            })
            .subscribe( )
    }

    initCol = ( ) => {
        let pid = this.props.params.id;
        this.columns = [{
            title: '文件名称',
            dataIndex: 'fileName',
            key: 'fileName'
        }, {
            title: '上传者',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '上传时间',
            dataIndex: 'updatedTime',
            key: 'updatedTime'
        }, {
            title: '操作',
            key: 'action',
            render: ( text, record ) => (
                <span>
                    <a href={`/api/v1/download?pid=${pid}&fileName=${text.fileName}`} download>下载</a>
                    <span className="ant-divider" />
                    <a onClick={( ) => this.handleDelete( text )}>删除</a>
                </span>
            )
        }]
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

    handleDelete = ( file: K ) => {

        let { uid, dataSource } = this.state;
        let { fileName } = file;
        let pid = this.props.params.id;


        // 1. 权限判断
        let hasAuth = uid === file.user._id;
        // 1-1. 通过
        if ( hasAuth ) {
            http.get<API.Res.DeleteFile, API.Query.DeleteFile>('/api/v1/delete-file', { pid, fileName })
                .do( res => {
                    if ( res.status === '200' ) {
                        message.success('删除文件成功！');

                        let index = dataSource.findIndex( data => String(data.key) === String(file.key));
                        dataSource.splice( index, 1 );

                        let a = [ ...dataSource ];
                        this.setState({
                            dataSource: a
                        })
                    }
                })
                .subscribe( )
        }
        // 1-2. 不通过
        if ( !hasAuth ) {
            Modal.warning({
                title: '消息',
                content: '抱歉。您没有删除该文件的权限！'
            })
        }
    }

    mapOriginToDataSource = ( data: Array<APP.File> ) => {
        return data.map(( file, key ) => ({
            key: `${Math.floor(Math.random( ) * 9999)}`,
            name: file.user.name,
            fileName: file.fileName,
            updatedTime: (new Date( file.updatedTime )).toLocaleString( ),
            user: file.user
        }))
    }

    combineFlow = ( ) => {

        let pid = this.props.params.id;

        this.sub = http.get<Array<APP.File>, API.Query.AllFiles>('/api/v1/all-files', { pid })
            .combineLatest(projectStore.file.data$)
            .do( res => {
               
                let { dataSource } = this.state;
                let [ fromFetch, fromSOK ] = res;
                
                if ( !fromSOK ) {
                    // console.log('首次加载')

                    this.setState({
                        loading: false,
                        dataSource: this.mapOriginToDataSource( fromFetch )
                    })

                } else {

                    /**fetch的时候是sort: -1 */
                    let lastFromFetch = fromFetch[ 0 ];

                    if ( fromFetch.length === 0 ) {
                        // console.log('首次数据来自于SOK')
                        return this.setState({
                            loading: false,
                            dataSource: [ ...this.mapOriginToDataSource([ fromSOK ]), ...dataSource ]
                        })
                    }

                    if ( fromSOK._id !== lastFromFetch._id ) {
                        // console.log('更新来自于SOK')
                        this.setState({
                            loading: false,
                            dataSource: this.mapOriginToDataSource([ fromSOK, ...fromFetch  ])
                        })
                    } else {
                        // console.log('二次进入')
                        this.setState({
                            loading: false,
                            dataSource: this.mapOriginToDataSource([ ...fromFetch ])
                        })
                    }

                }

            })
            .subscribe( )
    }

    render( ) {

        let { uid, dataSource, loading } = this.state;
        let { id } = this.props.params;

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
                    <Spin spinning={ loading } size='large'>
                        <Table columns={ this.columns } pagination={ false } dataSource={ dataSource }  />
                    </Spin>
                </div>
            </div>
        </div>
    }

}

interface IProps  extends RouteComponentProps<{id: string}, {}>{

}

interface IState {
    uid: string
    loading: boolean
    dataSource: Array<{
        key: string
        name: string
        fileName: string
        updatedTime: string
    }>
}