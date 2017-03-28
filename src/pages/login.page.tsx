import * as React from 'react';
import { Observable } from 'rxjs';
import http from '../services/http.service';
import myNotify from '../services/notification.service';
import { Tabs, Tooltip, Input, Icon, Form, Button, Checkbox, Layout, Modal } from 'antd';


import './login.less';
import { _IPostQueryLogin, IPostLogin_, _IPostQueryResetPsw, IPostResetPsw_, _IPostQuerySignIn, IPostSignIn_ } from '../interface/api.interface';


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


class LoginPage extends React.PureComponent< IProps, IState > {
    
    constructor( ) {
      super( );
      this.state = {
        activeKey: "1",
        loginLoading: false,
        resetLoading: false,
        resetFormShow: false
      }
    }

    logInSubmit = ( e ) => {
        e.preventDefault( );
        this.setState({ loginLoading: true })
        this.props.form.validateFields(['userName', 'userPhone', 'password', 'password2'], ( err, values: _IPostQueryLogin ) => {
          if ( !err ) {
             http.post<IPostLogin_>('/api/v1/login', values )
                .do(this.analyseSubmit)
                .catch(this.errorSumitHandler)
                .subscribe( )
          }
        });
      }

    signInSubmit = ( e ) => {
        e.preventDefault( );
        this.props.form.validateFields(['signPhone', 'signPsw'], (err, values: _IPostQuerySignIn) => {
          if (!err) {
             http.post<IPostSignIn_>('/api/v1/signin', values )
                .do(this.analyseSignIn)
                .catch(this.errorSumitHandler)
                .subscribe( )
          }
        });
      }
    
    resetSubmit = ( e ) => {
        e.preventDefault( );
        this.setState({ resetLoading: true })
        this.props.form.validateFields(['resetUserName', 'reseUserPhone',  'resetPsw',  'resetPsw2'], (err, values: _IPostQueryResetPsw ) => {
          if (!err) {
             http.post<IPostResetPsw_>('/api/v1/resetpsw', values )
                .do( this.analyseReset )
                .catch( this.errorSumitHandler )
                .subscribe( )
          }
        }); 
    }

    checkPswByRepeat = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('2次输入的密码不一致');
      } else {
        callback();
      }
    }

    checkResetPswByRepeat = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('resetPsw')) {
        callback('2次输入的密码不一致');
      } else {
        callback();
      }
    }

    CheckPswByPsw = (rule, value, callback) => {
      let { form } = this.props;
      let psw2 = form.getFieldValue('password2'); 
      if ( value && psw2 ) {
          form.setFields({
            password2:  {
              value: psw2,
              errors: value !== psw2 ? [new Error('2次输入的密码不一致')] : null
            }
          })
          callback( ); 
      } 
      callback( ); 
    }

    CheckResetPswByPsw = (rule, value, callback) => {
      let { form } = this.props;
      let psw2 = form.getFieldValue('resetPsw2'); 
      if ( value && psw2 ) {
          form.setFields({
            resetPsw2:  {
              value: psw2,
              errors: value !== psw2 ? [new Error('2次输入的密码不一致')] : null
            }
          })
          callback( ); 
      } 
      callback( ); 
    }

    resetPsw = ( ) => {
      this.setState({
        resetFormShow: true
      })
    }

    private analyseReset = ({ status, msg }: IPostResetPsw_ ) => {

      let { form } = this.props;
      this.setState({ resetLoading: false })

      myNotify.open({
        msg,
        title: `重置密码${status === '200'? '成功' : '失败' }`,
        type: status === '200' ? 'ok' : 'error'
      })

      if ( status === '4001' ) {
          let username = form.getFieldValue('resetUserName'); 
          form.setFields({
              resetUserName: {
                value: username,
                errors: [ new Error('用户不存在!')]
              }
          })
      } else if ( status === '4002' ) {
          let username = form.getFieldValue('reseUserPhone'); 
          form.setFields({
              reseUserPhone: {
                value: username,
                errors: [ new Error('手机号码不匹配!')]
              }
          })      
      } else if ( status === '4003' ) {
          let psw2 = form.getFieldValue('resetPsw2'); 
          form.setFields({
              resetPsw2:  {
                  value: psw2,
                  errors:  [new Error('2次输入的密码不一致')] 
              }
          }) 
      } else if ( status === '200' ) {
          setTimeout(( ) => {
              this.setState({ resetFormShow: false })
              form.resetFields( );
          }, 2000 )
      }

    }

    private analyseSubmit = ({ status, msg, user }: IPostLogin_ ) => {

        let { form } = this.props;
        this.setState({ loginLoading: false })
        
        myNotify.open({
            msg,
            title: `注册${status === '200' ? '成功' : '失败'}`,
            type: status === '200' ? 'ok' : 'error'
        })

        if ( status === '4001') {
          let psw2 = form.getFieldValue('password2'); 
          form.setFields({
              password2:  {
                  value: psw2,
                  errors:  [new Error('2次输入的密码不一致')] 
              }
          })
        } else if ( status === '4002' ) {
          let phone = form.getFieldValue('userPhone'); 
          form.setFields({
              userPhone:  {
                  value: phone,
                  errors:  [new Error('该手机号已被注册!')] 
              }
          })
        } else if ( status === '200' ) {
          setTimeout(( ) => {
              this.setState({
                 activeKey: '1'
              })
              form.resetFields( );
          }, 2000 )
        }
    }

    private analyseSignIn = ({ status, msg, user }: IPostSignIn_ ) => {

        let { form } = this.props;

        myNotify.open({
            msg,
            title: `登录${status === '200' ? '成功' : '失败'}`,
            type: status === '200' ? 'ok' : 'error'
        })  

        if ( status === '4001') {
          let phone = form.getFieldValue('signPhone'); 
          form.setFields({
              signPhone:  {
                  value: phone,
                  errors:  [new Error('该手机号未注册')] 
              }
          })
        } else if ( status === '4002' ) {
          let value = form.getFieldValue('signPsw'); 
          form.setFields({
              signPsw:  {
                  value,
                  errors:  [new Error('密码错误!')] 
              }
          })
        }  else if ( status === '200' ) {
          setTimeout(( ) => {
              form.resetFields( );
          }, 2000 )
        }

    }

    private errorSumitHandler = ( e ) => {
        myNotify.open({
            title: '注册请求错误',
            msg: `错误：${e}`,
            type: 'error'
        });
        return Observable.of( e )
    }

    render( ) {
      
        const { getFieldDecorator } = this.props.form;
        let { activeKey, loginLoading, resetLoading, resetFormShow } = this.state;

        /**注册表单 */
        let loginForm = 
        <Form onSubmit={this.logInSubmit} className="login-form" >
          <FormItem hasFeedback>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userPhone', {
              rules: [{ required: true, message: 'Please input your phone!' }],
            })(
              <Input prefix={<Icon type="phone" style={{ fontSize: 16 }} />} placeholder="userPhone" type="number" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
                { validator: this.CheckPswByPsw }
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password2', {
              rules: [
                { required: true, message: 'Please input your Password right again' },
                { validator: this.checkPswByRepeat }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="Password Again" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot">Forgot password</a>
          </FormItem>
          <FormItem>          
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loginLoading}>
              Log in
            </Button>
          </FormItem>
        </Form>;

        /**登录表单 */
        let signInForm = 
        <Form onSubmit={this.signInSubmit} className="login-form" >
          <FormItem>
            {getFieldDecorator('signPhone', {
              rules: [{ required: true, message: 'Please input your phone!' }],
            })(
              <Input prefix={<Icon type="phone" style={{ fontSize: 16 }} />} placeholder="phone" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('signPsw', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('signRemember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot"  onClick={this.resetPsw}>Forgot password</a>
          </FormItem>
          <FormItem>          
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Sign in
            </Button>
          </FormItem>
        </Form>;

        /**忘记密码表单 */
        let resetForm = 
        <Form className="reset-form">
            <FormItem >
                {getFieldDecorator('resetUserName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="Username" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('reseUserPhone', {
                  rules: [{ required: true, message: 'Please input your phone!' }]
                })(
                  <Input prefix={<Icon type="phone" style={{ fontSize: 16 }} />} placeholder="userPhone" type="number" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('resetPsw', {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                     { validator: this.CheckResetPswByPsw }
                  ],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="New Password" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('resetPsw2', {
                  rules: [
                    { required: true, message: 'Please input your Password right again' },
                    { validator: this.checkResetPswByRepeat }
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="Password Again" />
                )}
            </FormItem>
        </Form>

        return <div className="login-page">
            <div className="logo-block">
                <h1 className="title">iTeam</h1>
                <p  className="info">产品开发团队协作工具</p>
            </div>
            <div className="form-block">
                <Tabs activeKey={ activeKey } onTabClick={( e ) => this.setState({ activeKey: `${e}`})} >
                    <TabPane tab="登录" key="1">{ signInForm }</TabPane>
                    <TabPane tab="注册" key="2">{ loginForm }</TabPane>
                </Tabs>
            </div>
            <Modal  title="Reset Your Password" 
              onOk={( ) => this.setState({resetFormShow: true})} 
              visible={ resetFormShow }
              onCancel={( ) => this.setState({resetFormShow: false})}
              footer={[
                <Button key="back" size="large" onClick={( ) => this.setState({resetFormShow: false})} >Cacel</Button>,
                <Button key="submit" type="primary" size="large" onClick={ this.resetSubmit }>
                  Submit
                </Button>,
              ]} >
              { resetForm }
            </Modal>
        </div>
    }
}

export default Form.create( )(LoginPage)

interface IProps  {
    form: any
}

interface IState {
  activeKey: string
  loginLoading: boolean
  resetLoading: boolean
  resetFormShow: boolean
}