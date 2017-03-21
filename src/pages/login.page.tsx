import * as React from 'react';
import { Layout } from 'antd';
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
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

    signInSubmit = ( e ) => {
        e.preventDefault( );
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

    checkPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('2次输入的密码不一致');
      } else {
        callback();
      }
    }

    render( ) {
      
        const { getFieldDecorator } = this.props.form;
        let { activeKey } = this.state;
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
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password2', {
              rules: [
                { required: true, message: 'Please input your Password right again' },
                { validator: this.checkPassword }],
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
                    <TabPane tab="注册" key="1">{ loginForm }</TabPane>
                    <TabPane tab="登录" key="2">{ signInForm }</TabPane>
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