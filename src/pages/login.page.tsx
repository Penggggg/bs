import { Layout } from 'antd';
import * as React from 'react';
import { Observable } from 'rxjs';
import http from '../services/http.service';
import { _IPostQueryLogin, IPostLogin_ } from '../interface/api.interface';
import { Tabs, Tooltip, Input, Icon, Form, Button, Checkbox } from 'antd';


import './login.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@Form.create( )
export default class LoginPage extends React.PureComponent< IProps, IState > {
    
    constructor( ) {
      super( );
      this.state = {
        activeKey: "1"
      }
    }

    logInSubmit = ( e ) => {
        e.preventDefault( );
        this.props.form.validateFields(['userName', 'userPhone', 'password', 'password2'], ( err, values: _IPostQueryLogin ) => {
          if ( !err ) {
            http.post<IPostLogin_>('/api/v1/login', values )
                .do( a => console.log( a ))
                .catch( e => Observable.of( e ))
                .subscribe( )
          }
        });
      }

    signInSubmit = ( e ) => {
        e.preventDefault( );
        this.props.form.validateFields(['signUserName', 'signPsw'], (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
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

    render( ) {
      
        const { getFieldDecorator } = this.props.form;
        let { activeKey } = this.state;

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
              <Input prefix={<Icon type="phone" style={{ fontSize: 16 }} />} placeholder="userPhone" />
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
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Log in
            </Button>
          </FormItem>
        </Form>;

        /**登录表单 */
        let signInForm = 
        <Form onSubmit={this.signInSubmit} className="login-form" >
          <FormItem>
            {getFieldDecorator('signUserName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('signPsw', {
              rules: [{ required: true, message: 'Please input your Password!' }],
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
            <a className="login-form-forgot">Forgot password</a>
          </FormItem>
          <FormItem>          
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Sign in
            </Button>
          </FormItem>
        </Form>;

        return <div className="login-page">
            <div className="logo-block">
                <h1 className="title">iTeam</h1>
                <p  className="info">产品开发团队协作工具</p>
            </div>
            <div className="form-block">
                <Tabs defaultActiveKey={ activeKey }>
                    <TabPane tab="登录" key="1">{ signInForm }</TabPane>
                    <TabPane tab="注册" key="2">{ loginForm }</TabPane>
                </Tabs>
            </div>
        </div>
    }
}

interface IProps  {
    form: any
}

interface IState {
  activeKey: string
}