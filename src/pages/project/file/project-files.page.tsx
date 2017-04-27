import './project-files.less';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Icon, Button, Upload } from 'antd';


export default class ProjectFilesPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
    }

    render( ) {

        let { id } = this.props.params;

        return <div className="project-files-page">
            <div className="main-block">
                <div className="header">
                    <h3>文件库</h3>
                    <div className="upload-block">
                        <Upload action={`/api/v1/upload/${id}`} >
                            <Button>
                                <Icon type="upload" /> Upload
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

}