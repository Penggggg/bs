import './project-chat.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Button, Input } from 'antd';

import Image from '../../../component/Image/Image.component';
import userStore from '../../../store/user';
import projectStore from '../../../store/project';
import http from '../../../services/http.service';


export default class ProjectChatPage extends React.PureComponent< IProps, IState > {

    private uid: string = null;
    private sub: Subscription;

    constructor( ) {
        super( );
        this.state = {
            inputValue: '',
            chatList: [ ]
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
                this.uid = user._id;
                setTimeout(( ) => sub.unsubscribe( ), 100 );
            })
            .subscribe( );
    }

    dealChatList = ( ) => {
        let a = document.querySelector('#chatList');
        a.scrollTop = 100000;
        a = null;
    }

    combineFlow = ( ) => {
        let pid = this.props.params.id;
        this.sub = http
            .get<API.Res.ProjectChat, API.Query.ProjectChat>('/api/v1/chat-list', { pid })
            .combineLatest( projectStore.chat.data$)
            .do( res => {

                let { chatList } = this.state;
                let [ chatData, SOK ] = res;
                let chatListFromFetch = chatData.data;
                
                if ( !!SOK ) {
                    let newChat = {
                        user: {
                            _id: SOK.uid,
                            name: SOK.userName
                        },
                        content: SOK.content,
                        createdTime: SOK.createdTime
                    }
                    this.setState({ 
                        chatList: [...chatList, newChat ]
                    })                    
                } else {
                    this.setState({ 
                        chatList: [...chatListFromFetch]
                    })
                }

                setTimeout(( ) => this.dealChatList( ), 100 )
            })
            .subscribe( )

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
                this.analyseResult( res );
                setTimeout(( ) => sub2.unsubscribe( ), 100 )
            })
            .subscribe( )

    }

    analyseResult = ({ msg, status }: API.Res.AddChatRecord) => {
        if ( status === '200' ) {
            this.setState({
                inputValue: ''
            })
        }
    }

    render( ) {
        let { inputValue, chatList } = this.state;

        let list = this.uid ? 
            <ul>
                {
                chatList.map(( chat, key ) => <li key={key} className={ this.uid === chat.user._id ? 'me' : 'other' }>
                        <Image src="/static/touxiang.png" />
                        <h3>{ this.uid === chat.user._id ? '我' : chat.user.name }</h3>
                        <p className="content">{ chat.content }</p>
                        <p className="time">{ chat.createdTime ?
                                 (new Date( chat.createdTime )).toLocaleString( ) :
                                 (new Date( )).toLocaleString( ) }</p>
                    </li>)
                }
            </ul> 
            : 
            <ul></ul>

        return <div className="project-chat-page">
            <div className="chat-block">
                <div className="chat-list" id="chatList">
                    { list }
                </div>
                <div className="chat-input">
                    <textarea type="textarea" className="ant-input my-input" rows={4} value={ inputValue }
                         onChange={( e: any ) => this.setState({ inputValue: e.target.value})}/>
                    <Button type="primary" className="my-btn" onClick={this.postChat}>发送</Button>
                </div>
            </div>
        </div>
    }

}

interface IProps extends RouteComponentProps<{id: string}, {}>{

}

interface IState {
    inputValue: string,
    chatList: Array<{
        user: Partial<APP.User>
        content: string
        createdTime: string
    }> 
}