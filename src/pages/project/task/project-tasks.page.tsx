
import './tasks.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Icon, Modal, Form, Input, Button, AutoComplete, Select, Checkbox, Tooltip, Spin, Tabs, Row, Col, DatePicker, Tag } from 'antd';

import { IModel } from '../../../component/IModal';
import userStore from '../../../store/user';
import projectStore from '../../../store/project';
import http from '../../../services/http.service';
import Image from '../../../component/Image/Image.component';
import nitification from '../../../services/notification.service';


const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;



class ProjectTasksPage extends React.PureComponent< IProps, IState > {

    private sub: Subscription;
    private sub2: Subscription;
    private user: APP.User;
    private project: APP.Project;
    private groupLeaderID: Array<string>;
    private taskExecutorID: Array<string>;

    private selectGroupID: string;
    private formTaskName = "formTaskName";
    private formGroupName = "formGroupName";

    constructor( ) {
        super( );
        this.state = {
            groups: [ ],
            dataSource: [ ],
            spinning: true,
            selectTask: null,
            showTaskForm: false,
            showGroupForm: false,
            showTaskDetail: false,
            taskDetailFetching: false
        }
    }

    componentDidMount( ) {
        this.initData( );
        this.fetchGroups( );
        this.watchGroups( );
    }

    componentWillUnmount( ) {
        this.sub.unsubscribe( );
        this.sub2.unsubscribe( );
    }

    watchGroups = ( ) => {
        this.sub2 = projectStore.group.data$
            .skip( 1 )
            .do( e => this.fetchGroups( ))
            .subscribe( )
    }

    /**初始化user、project数据 */
    initData = ( ) => {

        setTimeout(( ) => {
            this.sub = userStore.data.userData$
                .combineLatest(projectStore.data.data$)
                .do( data => {
                    this.user = data[ 0 ];
                    this.project = data[ 1 ];
                })
                .subscribe( )
        }, 1000 )

    }

    /**权限检查：总负责人 */
    checkAuth2 = ( ): boolean => {
        let { _id } = this.user;
        let { creator, leader } = this.project;

        if ( creator._id === _id ) {
            return true;
        }

        return false;      
    }

    /**权限检查：总负责人或组长 */
    checkAuth = ( ): boolean => {
        
        let { _id } = this.user;
        let { creator, leader } = this.project;

        if ( creator._id === _id ) {
            return true;
        } else if ( leader.find( l => l._id === _id ) ) {
            return true;
        }
        
        return false;
    }

    /**增加项目任务分组 */
    addGroup = ( ) => {
        if ( !this.checkAuth2( )) {
            return Modal.warning({
                title: '消息',
                content: '抱歉。该项目中您还没有新增分组的权限'
            })
        } 
        this.setState({
            showGroupForm: true
        })
        this.fetchUser( );

    }

    /**增加任务分组 */
    addTask = ( group: Schema.Group$ ) => {
        let { _id } = this.user;
        this.selectGroupID = group._id;
        if ( this.checkAuth2( ) || group.leadersID.find( leader => leader._id === _id )) {
            this.setState({
                showTaskForm: true
            })
            this.fetchUser( );
        } else {
            return Modal.warning({
                title: '消息',
                content: '抱歉。该分组中您还没有新增任务的权限'
            })
        }

    }

    /**展示任务 */
    showTask = ( tid: string ) => {
        IModel.show( tid );
    }

    /**http:获取user */
    fetchUser = ( ) => {
        let pid = this.props.params.id;
        http
            .get< Array<APP.User>, API.Query.AllMemberLeader >('/api/v1/all-member-leader', { pid })
            .map( res => {
                return res.map(({ _id, name, phone }) => ({
                    value: `${_id}`,
                    text: `${name} - phone: ${phone} `
                }))
            })
            .do( res => {
                this.setState({
                    dataSource: res
                })
            })
            .subscribe( )
    }

    /**http:获取 group$ */
    fetchGroups = ( ) => {
        let pid = this.props.params.id;

        this.setState({ spinning: true })

        http.get<Array<Schema.Group$>, { pid: string } >('/api/v1/all-group', { pid })
            .do( groups => {
                this.setState({ 
                    groups,
                    spinning: false
                })
            })
            .subscribe( )
    }

    /**提交表单 —— 新增分组 */
    submitAddGroup = ( ) => {

        let { formGroupName } = this;
        let pid = this.props.params.id;

        this.props.form.validateFields([ formGroupName ], ( err, values ) => {
            if ( !err && this.groupLeaderID.length !== 0 ) {
                
                http.post<any, API.Query.AddNewGroup>('/api/v1/add-group', 
                    { pid, touid: this.groupLeaderID, fromuid: this.user._id, groupName: values[this.formGroupName] })
                    .do( res => {
                        if ( res.status === '200') {
                            nitification.open({
                                title: '消息',
                                msg: '新增组别成功！'
                            })
                        }
                        this.setState({
                            showGroupForm: false
                        })
                        this.groupLeaderID = [];
                    })
                    .subscribe( )

            } else if( !err && this.groupLeaderID.length === 0 ) {
                Modal.warning({
                    title: "消息",
                    content: '请选择组长'
                })
            }
        })
    }

    /**提交表单 —— 新增任务 */
    submitAddTask = ( ) => {

        let { formTaskName, selectGroupID, taskExecutorID } = this;
        let pid = this.props.params.id;

        this.props.form.validateFields([ formTaskName ], ( err, values ) => {
            if ( !err && this.taskExecutorID.length !== 0 ) {
                
                http.post<any, API.Query.AddNewTask>('/api/v1/add-task', 
                    { creatorID: this.user._id, title: values[formTaskName], groupID: selectGroupID, executorsID: taskExecutorID, pid })
                    .do( res => {
                        if ( res.status === '200') {
                            nitification.open({
                                title: '消息',
                                msg: '新增任务成功！'
                            })
                        }
                        this.setState({
                            showTaskForm: false
                        })                        
                        this.taskExecutorID = [];
                    })
                    .subscribe( )

            } else if( !err && this.taskExecutorID.length === 0 ) {
                Modal.warning({
                    title: "消息",
                    content: '请选择任务执行者'
                })
            }
        })
    }

    /**AutoComplete */
    choiceUser = ( value: Array<string> ) => {
        this.groupLeaderID = value;
    }

    /**selector */
    choiceExecutor = ( value: Array<string> ) => {
        this.taskExecutorID = value;
    }

    render( ) {

        let { formGroupName, formTaskName } = this;
        let { getFieldDecorator } = this.props.form;
        let { showGroupForm, showTaskForm, dataSource, groups, spinning, showTaskDetail, taskDetailFetching, selectTask } = this.state;

        /**新建分组表单 */
        let addGroupForm = <div className="modal-resetpsw-form">
            <div className="modal-img" style={{ height: 226 }}>
                <img src="/static/reset-psw.png" alt=""/>
                <p>创建一个新分组</p>
            </div>
            <Form className="reset-form">
                <FormItem >
                    {getFieldDecorator(formGroupName, {
                        rules: [{ required: true, message: '分组名称不能为空' }],
                    })(
                    <Input prefix={<Icon type="link" style={{ fontSize: 16 }} />} placeholder="组别名称" />
                    )}
                </FormItem> 
                <FormItem>
                    <Select mode="multiple" onChange={ this.choiceUser }
                        placeholder="请选择分组组长" 
                        style={{ width: 315 }}>
                        {
                            dataSource.map(( data, key ) => {
                                return <Option value={data.value} key={key}>{ data.text }</Option>
                            })
                        }
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" size='large' style={{ width: '100%'}}
                        onClick={this.submitAddGroup}>完成并创建</Button>
                </FormItem>
            </Form>
        </div>

        /**新建任务表单 */
        let addTaskForm = <div className="modal-resetpsw-form">
            <div className="modal-img" style={{ height: 226 }}>
                <img src="/static/reset-psw.png" alt=""/>
                <p>创建一个新任务</p>
            </div>
            <Form className="reset-form">
                <FormItem >
                    {getFieldDecorator(formTaskName, {
                        rules: [{ required: true, message: '任务名称不能为空' }],
                    })(
                    <Input prefix={<Icon type="link" style={{ fontSize: 16 }} />} placeholder="任务名称" />
                    )}
                </FormItem> 
                <FormItem>
                    <Select mode="multiple" onChange={ this.choiceExecutor }
                        placeholder="请选择任务执行者" 
                        style={{ width: 315 }}>
                        {
                            dataSource.map(( data, key ) => {
                            return <Option value={data.value} key={Math.floor(Math.random( )*999)}>{ data.text }</Option>
                            })
                        }
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" size='large' style={{ width: '100%'}}
                        onClick={this.submitAddTask}>完成并创建</Button>
                </FormItem>
            </Form>
        </div>

        /**全部任务列表 */
        let allGroup =  <Spin spinning={ spinning }>
                <ul className="groups-container">
                    {
                        groups.map(( group, key ) => <li key={key} className="group">
                        <h3>{ group.groupName }{(()=>{
                            let i = 0;
                            group.tasksID.map( t => {
                                if ( !t.finished ) { i++; }
                            });
                            return <span>{` · ${i}`}</span>;
                        })( )}</h3>
                            <ul className="task-list">
                                {
                                    group.tasksID.map(( task, key ) => !task.finished ? 
                                        <li key={ key }>
                                            <div className="check-block">
                                                <Checkbox />
                                            </div>
                                            <div className="content" onClick={()=>this.showTask(task._id)}>
                                                <h5>{ task.title }</h5>
                                                <div className="tips-block">
                                                    <Tooltip title={ (task.executorsID.map( x => x.name )).join('、') }>
                                                        <span>
                                                            <Image src="/static/touxiang.png" />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                                <div className="other">
                                                {
                                                    task.childTasksID.length !== 0 ?
                                                    <div>
                                                        <Tag color="#49a9ee">任务进度</Tag>
                                                        <Icon type="bars" />
                                                        { (( ) => {
                                                            let i = 0;
                                                            task.childTasksID.map( ctask => {
                                                                if ( ctask.finished ) { i++; }
                                                            })
                                                            return i;
                                                        })( )}
                                                        { `/${task.childTasksID.length}` }
                                                    </div> : ""
                                                }
                                                </div>
                                            </div>
                                        </li>
                                        : "" )
                                }
                                {
                                    group.tasksID.map(( task, key ) => task.finished ? 
                                        <li key={ key }>
                                            <div className="check-block">
                                                <Checkbox />
                                            </div>
                                            <div className="content">
                                                <p>{ task.title }</p>
                                                <div className="tips-block">
                                                    <Tooltip title={ (task.executorsID.map( x => x.name )).join('、') }>
                                                        <span>
                                                            <Image src="/static/touxiang.png" />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </li>
                                        : "" )
                                }
                            </ul>
                            <p className="add-task" onClick={()=>this.addTask( group )}>
                                <Icon type="plus-circle" style={{ marginRight: 10 }} />添加任务
                            </p>
                        </li>)
                    }
                </ul>
            </Spin>
        
        
        /** */
        return <div className="project-tasks-page">

            <div className="add-group-block">
                <Button type="primary" onClick={this.addGroup} size="small" >
                   <Icon type="plus-circle-o" />组别</Button>
            </div>

            <Tabs defaultActiveKey="1" >
                <TabPane tab="全部任务" key="1">
                    { allGroup }
                </TabPane>
                <TabPane tab="我的任务" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>

            <Modal  title="创建新项目"  footer={ null } visible={ showGroupForm }
                onCancel={( ) => this.setState({showGroupForm: false})}
                style={{ width: '400px !import', padding: '0 85px' }}>
                    { addGroupForm }
            </Modal>
            <Modal  title="添加任务"  footer={ null } visible={ showTaskForm }
                onCancel={( ) => this.setState({showTaskForm: false})}
                style={{ width: '400px !import', padding: '0 85px' }}>
                    { addTaskForm }
            </Modal>
        </div>
    }

}

export default Form.create( )(ProjectTasksPage)

interface IProps extends RouteComponentProps<{id: string}, {}>{
    form: any
}

interface IState {
    spinning: boolean
    showGroupForm: boolean
    showTaskForm: boolean
    showTaskDetail: boolean
    taskDetailFetching: boolean
    /**Selector数据源 */
    dataSource: Array<{
        value: string,
        text: string
    }> 
    /**组数据源 */
    groups: Array<Schema.Group$>
    selectTask: Schema.Task$ | null
}

