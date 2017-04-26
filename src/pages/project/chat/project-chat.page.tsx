import './project-chat.less';
import * as React from 'react';
import { Button, Input } from 'antd';


export default class ProjectChatPage extends React.PureComponent<{ }, { }> {

    constructor( ) {
        super( );
    }

    componentDidMount( ) {

    }

    combineFlow( ) {

    }

    render( ) {
        return <div className="project-chat-page">
            <div className="chat-block">
                <div className="chat-list">
                
                </div>
                <div className="chat-input">
                    <Input type="textarea" className="my-input" rows={4} />
                    <Button type="primary" className="my-btn">发送</Button>
                </div>
            </div>
        </div>
    }

}