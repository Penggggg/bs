import './project-chat.less';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Input } from 'antd';

import userStore from '../../../store/user';
import projectStore from '../../../store/project';
import http from '../../../services/http.service';


export default class ProjectChatPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            inputValue: '',
            chatList: [ ]
        }
    }

    componentDidMount( ) {

    }

    combineFlow( ) {

    }

    postChat = ( ) => {

        let data: [ APP.User, APP.Project ];
        let sub = userStore.data.userData$
            .combineLatest(projectStore.data.data$)
            .do( res => {
                data = res;
                setTimeout(( ) => sub.unsubscribe( ), 100 )
            })
            .subscribe( );

        let { inputValue } = this.state;
        let [ user, project ] = data;
        let sub2 = http
            .post<API.Res.AddChatRecord, API.Query.AddChatRecord>('/api/v1/chat-record', 
                { pid: project._id, uid: user._id, content: inputValue })
            .do( res => {
                console.log( res );
                this.analyseResult( res );
                setTimeout(( ) => sub2.unsubscribe( ), 100 )
            })
            .subscribe( )

    }

    analyseResult({ msg, status }: API.Res.AddChatRecord) {

    }

    render( ) {
        let { inputValue } = this.state;
        return <div className="project-chat-page">
            <div className="chat-block">
                <div className="chat-list">
                
                </div>
                <div className="chat-input">
                    <Input type="textarea" className="my-input" rows={4} 
                         onChange={( e: any ) => this.setState({ inputValue: e.target.value})}/>
                    <Button type="primary" className="my-btn" onClick={this.postChat}>发送</Button>
                </div>
            </div>
        </div>
    }

}

interface IProps extends RouteComponentProps<{}, {}>{

}

interface IState {
    inputValue: string,
    chatList: Array<{
        uid: string
        userName: string
        content: string
        createdTime: string
    }> 
}