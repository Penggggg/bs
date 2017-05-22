import './index.less'
import * as React from 'react';
import { Input, Button, Modal } from 'antd';

import http from '../../services/http.service';
import ls from '../../services/local-storage.service';


export default class UserPage extends React.PureComponent<{ }, IState > {

    public user: APP.User;

    constructor( ) {
        super( );
        this.state = {
            name: '',
            phone: '',
            password: '',
            newPassword: ''
        }
    }

    componentDidMount( ) {
        this.init( );
    }

    init = ( ) => {
        this.user = ls.getItem<APP.User>('user');
        let { name, phone } = this.user;
        this.setState({
            name,
            phone
        })
    }

    changeInfo = ( ) => {

        let { _id } = this.user;
        let { name, phone } = this.state; 

        http.post('/api/v1/change-info', { name, phone, _id })
            .do( (res:any) => {
                if ( res.status === '200' ) {
                    Modal.success({
                        title: '消息',
                        content: '信息更新成功！'
                    })
                    /**更新本地 */
                    let newUser = Object.assign({ }, this.user, { name, phone });
                    ls.setItem('user', newUser );
                }
            })
            .subscribe( )
    }

    changePsw = ( ) => {

        let { _id } = this.user;
        let { password, newPassword } = this.state;

        if ( !password || !newPassword ) {
            return Modal.warning({
                title: '消息',
                content: '请填写完整信息'
            })
        }

        if ( password !== this.user.password ) {
             return Modal.warning({
                title: '消息',
                content: '原密码不正确'
            })
        }

        http.post('/api/v1/change-psw', { newPassword, _id })
            .do( (res:any) => {
                if ( res.status === '200' ) {
                    Modal.success({
                        title: '消息',
                        content: '密码更新成功！'
                    })
                    /**更新本地 */
                    let newUser = Object.assign({ }, this.user, { password: newPassword });
                    ls.setItem('user', newUser );
                    /**页面更新 */
                    this.setState({
                        password: '',
                        newPassword: ''
                    })
                }
            })
            .subscribe( )        


    }

    render( ) {

        let { name, phone, password, newPassword } = this.state;

        return <div style={{ paddingTop: 60, paddingBottom: 50 }}>
            <div className="content">
                <h1 className="title">个人账号中心</h1>
                <div className="data-block">
                    <h5>基本信息</h5>
                    <label><span>昵称：</span>
                        <Input placeholder="请输入新的昵称" size="large" value={name} 
                            onChange={(e:any)=>this.setState({ name: e.target.value })}/></label>
                    <label><span>手机：</span>
                        <Input placeholder="请输入新的手机号码" size="large" value={phone} 
                            onChange={(e:any)=>this.setState({ phone: e.target.value })}/></label>
                    <div style={{ marginTop: 15, textAlign: 'right', paddingRight: 50 }}>
                        <Button type="primary" style={{ width: 100 }} size="large" onClick={this.changeInfo}>更改信息</Button>
                    </div>
                    <h5>账号信息</h5>
                    <label><span>旧密码：</span>
                        <Input placeholder="请输入您的旧密码" size="large" type="password" value={password} 
                            onChange={(e:any)=>this.setState({ password: e.target.value })}/></label>
                    <label><span>新密码：</span>
                        <Input placeholder="请输入您的新密码" size="large" type="password" value={newPassword}
                            onChange={(e:any)=>this.setState({ newPassword: e.target.value })}/></label>
                </div>
                <div style={{ marginTop: 15, textAlign: 'right', paddingRight: 50 }}>
                    <Button type="primary" style={{ width: 100 }} size="large" onClick={this.changePsw}>更改密码</Button>
                </div>
            </div>
        </div>
    }


}

interface IState {
    name: string
    phone: string
    password: string
    newPassword: string
}