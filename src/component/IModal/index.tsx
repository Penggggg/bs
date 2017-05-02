import './index.less'
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Modal, Spin, Row, Col, DatePicker, Select, Tooltip, Button } from 'antd';

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
    

    constructor( ) {
        super( );
        this.state = {
            task: null,
            spinning: true
        }
    }

    componentDidMount( ) {
        this.fetchTask( this.props.tid );
    }

    fetchTask = ( tid: string ) => {
        http.get<Schema.Task$, { tid: string }>('/api/v1/task-detail', { tid })
            .do( res => {
                console.log( res );
                this.setState({
                    task: res,
                    spinning: false
                })
            })
            .subscribe( )
    }

    onNo = ( ) => {
        // 销毁
        ReactDom.unmountComponentAtNode( this._container );
        this._dom.remove( );;
    }

    render( ) {
        let { spinning, task } = this.state;
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
                            { task.content }
                        </div>
                        <div className="child-task-list">
                        {
                            task.childTasksID.length !== 0 ?
                            <ul>123</ul>
                            :
                            <h5>点击添加子任务</h5>
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
                            <textarea type="textarea" className="ant-input" rows={3} placeholder="添加任务留言" />
                            <Button type="primary" >发送</Button>
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
}