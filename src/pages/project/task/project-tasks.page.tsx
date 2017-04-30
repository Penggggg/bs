
import './tasks.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Icon, Modal, Form, Input, Button, AutoComplete, Select } from 'antd';



import userStore from '../../../store/user';
import projectStore from '../../../store/project';
import http from '../../../services/http.service';
import notification from '../../../services/notification.service';


const FormItem = Form.Item;
const Option = Select.Option;


class ProjectTasksPage extends React.PureComponent< IProps, IState > {

    private sub: Subscription;
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
            showTaskForm: false,
            showGroupForm: false
        }
    }

    componentDidMount( ) {
        this.initData( );
        this.fetchGroups( );
    }

    componentWillUnmount( ) {
        this.sub.unsubscribe( );
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
    addTask = ( group: APP.Group ) => {
        let { _id } = this.user;
        this.selectGroupID = group._id;
        if ( this.checkAuth2( ) || group.leaders.find( leader => leader._id === _id )) {
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
        http.get<Array<APP.Group>, { pid: string } >('/api/v1/all-group', { pid })
            .do( groups => {
                console.log( groups );
                this.setState({ groups })
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
                        console.log( res );
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
                
                http.post<any, Partial<Schema.Task>>('/api/v1/add-task', 
                    { creatorID: this.user._id, title: values[formTaskName], groupID: selectGroupID, executorsID: taskExecutorID })
                    .do( res => {
                        console.log( res );
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


    choiceExecutor = ( value: Array<string> ) => {
        this.taskExecutorID = value;
    }

    render( ) {

        let { formGroupName, formTaskName } = this;
        let { getFieldDecorator } = this.props.form;
        let { showGroupForm, showTaskForm, dataSource, groups } = this.state;

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

 
        return <div className="project-tasks-page">
            <ul className="groups-container">
                {
                    groups.map(( group, key ) => <li key={key} className="group">
                        <h3>{ group.groupName }</h3>
                        <ul className="task-list">
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                        </ul>
                        <p className="add-task" onClick={()=>this.addTask( group )}>
                            <Icon type="plus-circle" style={{ marginRight: 10 }} />添加任务
                        </p>
                    </li>)
                }
                <li className="add-group group">
                    <p onClick={this.addGroup}>
                        <Icon type="plus-circle" style={{ marginRight: 10 }} />新建项目分组</p>
                </li>
            </ul>
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
    showGroupForm: boolean
    showTaskForm: boolean
    /**Selector数据源 */
    dataSource: Array<{
        value: string,
        text: string
    }> 
    /**组数据源 */
    groups: Array<APP.Group>
}