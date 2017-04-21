import * as React from 'react';
import { Subscription } from 'rxjs';
import http from '../../services/http.service';
import Auth from '../../services/auth-login.service';
import ProjectStore from '../../store/project';
import UserStore from '../../store/user';
import Notifycation from '../../services/notification.service';
import { Card, Icon, Modal, Button, Form, Input } from 'antd';
import Image from '../../component/Image/Image.component';



import './project-all.less';
import { Util } from '../../index.con';
import { RouteComponentProps } from 'react-router';


const FormItem = Form.Item;

class ProjectAllPage extends React.PureComponent< IProps, IState > {
    

    private watchingRole = false;
    private formProjectName = 'projectName';
    private formProjectInfo = 'projectInfo';
    private userData = Auth.userData( );

    private userStore = UserStore;
    private projectStore = ProjectStore;

    constructor( ) {
        super( );
        this.state = {
            dynamicFormShow: false,
            formSubmiting: false,
            projectAll: [ ]
        }
    }

    componentDidMount( ) {
        this.fetchAllProject( );
    }

    componentWillUnmount( ) {
       
    }

    private fetchAllProject = ( ) => {
        http
            .get<API.Res.AllProject>('/api/v1/all-project')
            .do( res => this.setState({
                projectAll: res.data
            }))
            .subscribe( )
    }

    private onEnterProject = ( project: APP.Project ) => {
        /**保存project数据 */
        this.projectStore.data.save( project );
        if ( !this.watchingRole ) {
            this.watchingRole = true;
            this.watchRole( );
        }
    }

    private watchRole = ( ) => {
        let sub = this.projectStore.data.data$
            .combineLatest(this.userStore.data.userData$)
            .debounceTime( 500 )
            .do( res => {
                console.log('权限判断中...')

                let isLeader = false;
                let isMember = false;
                let isCreator = false;

                let userID = res[1]._id;

                /**creator判断 */
                if ( userID === res[0].creator._id ) {
                    isCreator = true;
                    this.projectStore.role.save('creator');
                    this.props.router.push(`/project/${res[0]._id}/tasks`)
                }

                /**leader判断 */
                isLeader = res[0].leader.some(( leader ) => {
                    if ( userID === leader._id ) {
                        this.projectStore.role.save('leader');
                        this.props.router.push(`/project/${res[0]._id}/tasks`);
                        return true;
                    }
                    return false;
                })

                /**member判断 */
                if( !isLeader ) {
                    isMember = res[0].member.some(( member ) => {
                        if ( userID === member._id ) {
                            this.projectStore.role.save('member');
                            this.props.router.push(`/project/${res[0]._id}/tasks`);
                            return true;             
                        }
                        return false;
                    })
                }
                /**没有权限 */
                if (!( isCreator || isLeader || isMember )) {
                    Modal.warning({
                        title: 'Warning',
                        content: '您没有该项目的权限！请先申请权限'
                    })
                }
                Util.cancelSubscribe( sub );
            })
            .subscribe( )
    }

    private renderToJsx = ( project: APP.Project ) => {
        return <Card key={ project._id } className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
            <div className="image" onClick={( ) => this.onEnterProject( project )}>
                <Image src={ project.cover } />
            </div> 
            <div className="info" onClick={( ) => this.onEnterProject( project )}>
                 <h3>{ project.name }</h3>
                 <p>{ project.info }</p>
           </div>                     
      </Card>
    }


    private newProjectSubmit = ( ) => {
        let { formProjectName, formProjectInfo } = this;
        this.props.form.validateFields([formProjectName, formProjectInfo], ( err, values ) => {
            if ( !err ) {
                this.setState({
                    formSubmiting: true
                })
                http.post<API.Res.CreateProject>('/api/v1/create-project', Object.assign(values, { creatorID: Auth.userData( )._id }))
                    .do(this.analyseProjectSubmit)
                    .subscribe( )
            }
        })
    }

    private analyseProjectSubmit = ( res: API.Res.CreateProject ) => {
        Notifycation.open({
            title: '系统消息',
            msg: res.msg,
            type: res.status === '200' ? 'ok' : 'error'
        })
        setTimeout(( ) => {
            this.setState({
                formSubmiting: false,
                dynamicFormShow: false
            });
            this.props.form.resetFields( );
            this.fetchAllProject( );
        }, 1500 )
    }

    render ( ) {

        const { getFieldDecorator } = this.props.form;
        let { formProjectName, formProjectInfo } = this;
        let { dynamicFormShow, formSubmiting, projectAll } = this.state;
        

        /**新增项目表单 */
        let dynamicForm = 
            <div className="modal-resetpsw-form">
                <div className="modal-img">
                    <img src="/static/reset-psw.png" alt=""/>
                    <p>创建一个新项目</p>
                </div>
                <Form className="reset-form">
                    <FormItem >
                        {getFieldDecorator(formProjectName, {
                            rules: [{ required: true, message: '项目名称不能为空' }],
                        })(
                        <Input prefix={<Icon type="file-text" style={{ fontSize: 16 }} />} placeholder="项目名称" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator(formProjectInfo, {
                            
                        })(
                        <Input prefix={<Icon type="link" style={{ fontSize: 16 }} />} placeholder="项目简介（选项）" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" size='large' style={{ width: '100%'}} loading={ formSubmiting }
                            onClick={this.newProjectSubmit}>完成并创建</Button>
                    </FormItem>
                </Form>
            </div>



        return <div className="project-all-page">
            <div className="my-project">
                <div className="title">
                    <h2>我已拥有的项目</h2>
                    <span></span>
                </div>
                <div className="projects-block">
                    {
                         projectAll.map(( project ) => {
                             if ( this.userData._id === project.creator._id ) {
                                 return this.renderToJsx( project )
                             } 
                             project.leader.some(( leader ) => {
                                 if ( this.userData._id === leader._id ) {
                                    this.renderToJsx( project );
                                    return true;
                                 }
                                 return false;
                             })
                             project.member.some(( member ) => {
                                 if ( this.userData._id === member._id ) {
                                    this.renderToJsx( project );
                                    return true;
                                 }
                                 return false;
                             })              
                         })                        
                    }
                     <Card  className="project-card add-project-card"  bodyStyle={{ padding: 0, height: '100%'}}>
                        <Icon type="plus-circle" className="icon" onClick={( ) => this.setState({ dynamicFormShow: true })} />
                        <p>创建新项目</p>
                    </Card>
                </div>
            </div>
            <div className="all-project">
                <div className="title">
                    <h2>全部的项目</h2>
                    <span></span>
                </div>
                <div className="projects-block">
                     {
                         projectAll.map( this.renderToJsx )
                     }
                </div>
            </div>
            <Modal  title="创建新项目"  footer={ null } visible={ dynamicFormShow }
                onCancel={( ) => this.setState({dynamicFormShow: false})}
                style={{ width: '400px !import', padding: '0 85px' }}>
                    { dynamicForm }
            </Modal>
        </div>
    }

}


export default Form.create( )(ProjectAllPage)

interface IProps extends RouteComponentProps<{ }, { }> {
    form: any
}


interface IState {
    dynamicFormShow: boolean
    formSubmiting: boolean
    projectAll: Array<APP.Project>
}