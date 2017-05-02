import './index.less'
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Modal, Spin, Row, Col, DatePicker, Select, Tooltip, Button, message, Checkbox  } from 'antd';

import userStore from '../../store/user';
import http from '../../services/http.service';
import Image from '../../component/Image/Image.component';

const Option = Select.Option;

export class IModel extends React.PureComponent< IProps, IState > {

    _container;
    _dom;
    _resolve: Function;
    _reject: Function;
    _promise: Promise<string> = new Promise<string>(( resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
    })
    
    static show( tid: string ) {
        let div = document.createElement('div');
        let _model: any = ReactDom.render(<IModel tid={ tid } />, div);
        let dom = document.querySelector('body').appendChild(div);
        _model._container = div;
        _model._dom = dom;
        return _model._promise;
    }
    

    private uid: string;

    constructor( ) {
        super( );
        this.state = {
            task: null,
            spinning: true,          
            chatValue: '',
            contentValue: '',
            childTaskValue: '',
            showContentEdit: false,
            showChildTaskEdit: false
        }
    }

    componentDidMount( ) {
        this.init( );
        this.fetchTask( this.props.tid );
    }

    init = ( ) => {
        let sub = userStore.data.userData$
            .do( res => {
                this.uid = res._id;
                setTimeout(( ) => sub.unsubscribe( ), 100 );
            })
            .subscribe( );
    }

    fetchTask = ( tid: string ) => {
        http.get<Schema.Task$, { tid: string }>('/api/v1/task-detail', { tid })
            .do( res => {
                console.log( res );
                let { content } = res;
                this.setState({
                    task: res,
                    contentValue: content,
                    spinning: false
                })
            })
            .subscribe( )
    }

    /**执行者丶组长丶负责人 */
    authCheck = ( ) => {

        let { uid } = this;
        let { executorsID } = this.state.task;
        let { leadersID, creatorID } = this.state.task.groupID;
        
        if ( executorsID.find( exe => exe._id === uid )) {
            return true;
        } else if ( creatorID._id === uid ) {
            return true;
        } else if ( leadersID.find( leader => leader._id === uid )) {
            return true;
        }

        Modal.warning({
            title: '消息',
            content: '抱歉。在该任务中您还没有执行操作的权限'
        })
        
        return false;

    }

    submitChat = ( ) => {

        let { uid } = this;
        let { tid } = this.props;
        let { chatValue } = this.state;
        let { pid } = this.state.task.groupID;

        if ( this.authCheck( )) {
            
            http.post< API.Res.AddNewTaskTalk, API.Query.AddNewTaskTalk>('/api/v1/add-task-talk', {
                content: chatValue, creatorID: uid, taskID: tid, pid
            })
            .do( res => {
                if ( res.status === '200' ) {
                    this.setState({
                        chatValue: '',
                        task: res.data
                    })
                    message.success({
                        title: '消息',
                        content: '添加任务留言成功'
                    })
                }
            })
            .subscribe( )

        }

    }

    submitContent = ( ) => {
        let { uid } = this;
        let { tid } = this.props;
        let { contentValue } = this.state;
        let { pid } = this.state.task.groupID;

        if ( this.authCheck( )) {
            http.post< API.Res.UpdateTaskContent, API.Query.UpdateTaskContent>('/api/v1/update-task-content', {
                content: contentValue, creatorID: uid, _id: tid, pid
            })
            .do( res => {
                if ( res.status === '200' ) {
                    this.setState({
                        task: res.data,
                        contentValue: res.data.content,
                        showContentEdit: false
                    })
                    message.success({
                        title: '消息',
                        content: '成功更新任务内容！'
                    })
                }
            })
            .subscribe( )
        }
    }

    submitTask = ( ) => {

        let { uid } = this;
        let { tid } = this.props;
        let { childTaskValue } = this.state;
        let { pid } = this.state.task.groupID;

        if ( this.authCheck( )) {

            http.post< API.Res.AddChildTask, API.Query.AddChildTask>('/api/v1/add-child-task', {
                content: childTaskValue, creatorID: uid, taskID: tid, pid
            })
            .do( res => {
                if ( res.status === '200' ) {
                    this.setState({
                        task: res.data,
                        childTaskValue: '',
                        showChildTaskEdit: false
                    })
                    message.success({
                        title: '消息',
                        content: '成功添加一条子任务！'
                    })
                }
                console.log(res)
            })
            .subscribe( )       

        }
    }

    onNo = ( ) => {
        // 销毁
        ReactDom.unmountComponentAtNode( this._container );
        this._dom.remove( );;
    }

    render( ) {
        let { spinning, task, chatValue, contentValue, showContentEdit, childTaskValue, showChildTaskEdit } = this.state;
        return(
            <Modal title={`任务详情`} visible={ true } onCancel={ this.onNo } footer={ null } className="task-detail-modal">
                <Spin spinning={ spinning } size="large">
                {
                    task ?
                    <div>
                        <div className="title">
                            <h1>{ task.title }</h1>
                        </div>
                        <div className="header-bar">
                            <Row>
                                <Col span={ 8 } className="line">
                                    <h5 className="small-title">执行者</h5>
                                    <p style={{ padding: '5px 0 0 30px' }}>{ (task.executorsID.map( x => x.name )).join('、') }</p>
                                    <Image src="/static/touxiang.png" /> 
                                </Col>
                                <Col span={ 8 } className="line">
                                    <h5 className="small-title">截止时间</h5>
                                    <DatePicker disabled style={{ width: 150 }} />
                                </Col>
                                <Col span={ 8 }>
                                    <h5 className="small-title">优先级</h5>
                                    <Select defaultValue="1" style={{ width: 150 }} disabled >
                                        <Option value="1">一般</Option>
                                        <Option value="2">紧急</Option>
                                        <Option value="3">非常紧急</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                        <div className="content">
                            <h5>任务内容</h5>
                            <Button className="edit" onClick={( ) => this.setState({ showContentEdit: !showContentEdit })}>编辑</Button>
                            <pre style={{ paddingTop: 10 }}>{ task.content }</pre>
                            {
                                <div className={ showContentEdit? "edit-block show" : "edit-block" }>
                                    <textarea type="textarea" className="ant-input" rows={3} 
                                        value={ contentValue } onChange={(e: any) => this.setState({ contentValue: e.target.value }) } />
                                    <Button onClick={this.submitContent}>确定</Button>
                                </div>           
                            }
                        </div>
                        <div className="child-task-list">
                            <h5>子任务列表</h5>
                            <Button className="open" onClick={() => this.setState({ showChildTaskEdit: true, childTaskValue: '' })}>添加</Button>
                        {
                            task.childTasksID.length !== 0 ?
                            <ul style={{ paddingTop: 15 }}>
                            {
                                task.childTasksID.map(( childtask , k ) => <li key={ k }>
                                    <Checkbox value={ childtask.finished} />
                                    <h5>{ childtask.content }</h5>
                                    <span className="time">{ ( new Date( childtask.createdTime )).toLocaleString( ) }</span>
                                </li>)
                            }
                            </ul>
                            :""
                        }
                        {
                            <div className={ showChildTaskEdit? "edit-block show" : "edit-block" }>
                                <textarea type="textarea" className="ant-input" rows={2} 
                                        value={ childTaskValue } onChange={(e: any) => this.setState({ childTaskValue: e.target.value }) } />
                                    <Button onClick={this.submitTask}>确定</Button>
                            </div>           
                        }
                        </div>
                        <div className="member">
                            <h5>任务参与者</h5>
                            <Tooltip title={ task.groupID.creatorID.name }>
                                <span >
                                    <Image src="/static/touxiang.png" />
                                </span>
                            </Tooltip>
                            {
                                task.groupID.leadersID.map(( leader, k ) => <Tooltip title={ leader.name } key={ k }>
                                    <span >
                                        <Image src="/static/touxiang.png" />
                                    </span>
                                </Tooltip>)
                            }
                            {
                                task.executorsID.map(( exe, k ) => <Tooltip title={ exe.name } key={ k }>
                                    <span >
                                        <Image src="/static/touxiang.png" />
                                    </span>
                                </Tooltip>)
                            }
                            
                        </div>
                        <div className="chat-list">
                            <h5>任务留言</h5>
                        {
                            task.taskTalksID.length !== 0 ?
                            <ul>
                            {
                                task.taskTalksID.map(( talk, k ) => <li key={ k }>
                                    <Image src="/static/touxiang.png" />
                                    <h3>{ talk.creatorID.name }</h3>
                                    <p>{ talk.content }</p>
                                    <span className="time">{ (new Date( talk.createdTime)).toLocaleString( ) }</span>
                                </li>)
                            }
                            </ul>
                            : ""
                        }
                        </div>
                    </div>
                    : ""
                }
                </Spin>
                {
                    task ?
                        <div className="add-chat">
                            <textarea type="textarea" className="ant-input" rows={3} placeholder="添加任务留言"
                                value={ chatValue } onChange={(e: any) => this.setState({ chatValue: e.target.value }) } />
                            <Button type="primary" onClick={this.submitChat}>发送</Button>
                        </div>
                    : ""
                } 
            </Modal>
        )
    }
}

interface IProps {
    tid: string
}

interface IState {

    spinning: boolean
    task: Schema.Task$ | null
    
    chatValue: string
    contentValue: string
    childTaskValue: string

    showContentEdit: boolean
    showChildTaskEdit: boolean
}