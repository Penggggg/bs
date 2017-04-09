import * as React from 'react';
import http from '../../services/http.service';
import Auth from '../../services/auth-login.service';
import Notifycation from '../../services/notification.service';
import { Card, Icon, Modal, Button, Form, Input } from 'antd';
import Image from '../../component/Image/Image.component';


import { IProject } from '../../interface/app.interface';
import './project-all.less';
import { RouteComponentProps } from 'react-router';
import { _IPostQueryCreateProject, IPostCreateProject_, IGetAllProject_ } from '../../interface/api.interface';


const FormItem = Form.Item;

class ProjectAllPage extends React.PureComponent< IProps, IState > {
    
    private formProjectName = 'projectName';
    private formProjectInfo = 'projectInfo';

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

    private fetchAllProject = ( ) => {
        http
            .get<IGetAllProject_>('/api/v1/all-project')
            .do( res => console.log( res ))
            .subscribe( )
    }


    private newProjectSubmit = ( ) => {
        let { formProjectName, formProjectInfo } = this;
        this.props.form.validateFields([formProjectName, formProjectInfo], ( err, values ) => {
            if ( !err ) {
                this.setState({
                    formSubmiting: true
                })
                http.post<IPostCreateProject_>('/api/v1/create-project', Object.assign(values, { creatorID: Auth.userData( )._id }))
                    .do(this.analyseProjectSubmit)
                    .subscribe( )
            }
        })
    }

    private analyseProjectSubmit = ( res: IPostCreateProject_ ) => {
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
        }, 1500 )
    }

    render ( ) {

        const { getFieldDecorator } = this.props.form;
        let { formProjectName, formProjectInfo } = this;
        let { dynamicFormShow, formSubmiting } = this.state;
        

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
                    <Card className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
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
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                </div>
            </div>
            <Modal  title="创建新项目" 
              footer={ null }
              visible={ dynamicFormShow }
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
    projectAll: Array<IProject>
}