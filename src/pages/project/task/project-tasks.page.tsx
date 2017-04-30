
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

    private formGroupName = "formGroupName";

    constructor( ) {
        super( );
        this.state = {
            dataSource: [ ],
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
            .do( res => {
                console.log( res );
            })
            .subscribe( )
    }

    /**提交表单 —— 新增任务分组 */
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

    /**AutoComplete */
    choiceUser = ( value: Array<string> ) => {
        this.groupLeaderID = value;
    }


    render( ) {

        let { formGroupName } = this;
        let { getFieldDecorator } = this.props.form;
        let { showGroupForm, dataSource } = this.state;

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
                    <Input prefix={<Icon type="link" style={{ fontSize: 16 }} />} placeholder="分组名称" />
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


        return <div className="project-tasks-page">
            <ul className="groups-container">
                <li className=" group">
                    <p>新建项目分组</p>
                </li>
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
        </div>
    }

}

export default Form.create( )(ProjectTasksPage)

interface IProps extends RouteComponentProps<{id: string}, {}>{
    form: any
}

interface IState {
    showGroupForm: boolean
    /**Selector数据源 */
    dataSource: Array<{
        value: string,
        text: string
    }> 
}