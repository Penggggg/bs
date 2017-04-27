import './project-files.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Icon, Button, Upload } from 'antd';


import userStore from '../../../store/user';
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
        this.sub = userStore.data.userData$
            .do( user => {
                this.setState({
                    uid: user._id
                })
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

        http.get<API.Res.AllFiles, API.Query.AllFiles>('/api/v1/all-files', { pid })
            .do( res => {
                console.log( res )
            })
            .subscribe( )
    }

    render( ) {

        let { uid } = this.state;
        let { id } = this.props.params;

        return <div className="project-files-page">
            <div className="main-block">
                <div className="header">
                    <h3>文件库</h3>
                    <div className="upload-block">
                        <Upload action={`/api/v1/upload/${id}/${uid}`} onChange={ this.onUpload }>
                            <Button>
                                <Icon type="upload" /> Uploadddd
                            </Button>
                        </Upload>
                    </div>
                </div>
                <div className="content"></div>
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