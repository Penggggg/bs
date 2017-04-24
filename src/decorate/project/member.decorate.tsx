import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Icon, Modal, Button, AutoComplete, Tag } from 'antd';


import { Subscription } from 'rxjs';
import { ENUM } from '../../index.con';


import userStore from '../../store/user';
import projectStore from '../../store/project';
import http from '../../services/http.service';
import Notification from '../../services/notification.service';
import Image from '../../component/Image/Image.component';


export let InjectMember = ( Slider ) => {

    class Wrapper extends React.PureComponent< IProps, IState > {

        private dom: Element;
        private container: Element;
        private sub: Subscription;
        private choicedUID: string;

        constructor( ) {
            super( );
            this.state = {
                content: <div><ul></ul></div>,
                showForm: false,
                dataSource: [ ]
            }
        }

        componentWillMount( ) {
            let timer = setInterval(( ) => {
                if ( !!projectStore.data.data$ ) {
                    this.watchProject( );
                    clearInterval( timer );
                }
            }, 30 )
        }

        componentWillUnmount( ) {
            this.sub.unsubscribe( );
        }

        addNewMember = ( ) => {
            this.fetchUser( );
            this.setState({
                showForm: true
            })
        }

        submitHandler = ( ) => {
            let { choicedUID } = this;
            let sub = userStore.data.userData$
                .combineLatest( projectStore.data.data$ )
                .do( res => {
                    if ( res[0]._id === choicedUID ) {
                        Notification.open({
                            title: '系统消息',
                            msg: '错误！不能邀请自己！',
                            type: 'error'
                        })
                    } else {
                        let sub = http
                            .post<API.Res.InviteMember, API.Query.InviteMember>('/api/v1/invite-member', {
                                fromUID: res[0]._id,
                                toUID: choicedUID,
                                PID: res[1]._id,
                                type: ENUM.MsgType.InviteMember,
                                content: `${res[0].name}诚意邀请您加入项目【${res[1].name}】。请问您是否同意？`
                            })
                            .do( res => {
                                Notification.open({
                                    title: '系统消息',
                                    msg: res.status === '200' ? '邀请发送成功！':'邀请发送失败！',
                                    type: res.status === '200' ? 'ok' : 'error'
                                })
                                setTimeout(( ) => {
                                    this.setState({ showForm: false });
                                    this.props.onClose( );
                                    sub.unsubscribe( );
                                }, 1000 );
                            })
                            .subscribe( )
                    }
                })
                .subscribe( )
        }

        watchProject = ( ) => {
            this.sub = projectStore.data.data$
                .do( project => {
                    let { creator, member, leader, _id } = project;
                    
                    this.setState({
                        content: <div><ul>
                            <li className="btn" style={{ paddingLeft: 0 }} onClick={ this.addNewMember }>
                                <Icon type="plus-circle" />
                                <a>邀请新成员</a>
                            </li>
                            {
                                <li>
                                    <Tag color="#108ee9" className="my-tag">项目负责人</Tag>
                                    <Image src="/static/touxiang.png" />
                                    <h3>{ creator.name }</h3>
                                    <p>{ creator.phone }</p>
                                </li>
                            }
                            {
                                leader.map(( l, key ) => {
                                    return <li key={key}>
                                        <Tag color="#6252cd" className="my-tag">组长</Tag>
                                        <Image src="/static/touxiang.png" />
                                        <h3>{ l.name }</h3>
                                        <p>{ l.phone }</p>
                                    </li>
                                })
                            }
                            {
                                member.map(( l, key ) => {
                                    return <li key={key}>
                                        <Tag color="#00a854" className="my-tag">成员</Tag>
                                        <Image src="/static/touxiang.png" />
                                        <h3>{ l.name }</h3>
                                        <p>{ l.phone }</p>
                                    </li>
                                })                         
                            }
                        </ul></div>
                    })
                })
                .subscribe( )
        }

        fetchUser = ( value = '' ) => {
            http
                .post< Array<APP.User>, API.Query.AllUser >('/api/v1/all-user', { name: value })
                .map( res => {
                    return res.map(({ _id, name, phone }) => ({
                       value: `${name}-${_id}`,
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

        choiceUser = ( value: string ) => {
            let id = value.split('-')[1];
            this.choicedUID = id;
            console.log( id )
        }
        
        render( ) {

            let { content, showForm, dataSource } = this.state;

            let form = <div className="modal-resetpsw-form">
                <h3>账号邀请</h3>
                <AutoComplete
                    dataSource={ dataSource }
                    onSelect={ this.choiceUser }
                    onChange={ this.fetchUser }
                    style={{ width: '310px', margin: '10px 0px' }} />
                <div className="modal-img"><img src="/static/jielibang.png" alt=""/></div>
            </div>

            return <div>
                <Slider title='项目成员' content={ content } {...this.props}/>
                <Modal title='邀请新成员' visible={ showForm }
                    onOk={( ) => this.setState({ showForm: true})} 
                    onCancel={( ) => this.setState({ showForm: false})}
                    style={{ width: '400px !import', padding: '0 85px', marginTop: '-40px' }}
                    footer={[
                        <Button key="back" size="large" onClick={( ) => this.setState({ showForm: false })} >Cacel</Button>,
                        <Button key="submit" type="primary" size="large" onClick={ this.submitHandler }>
                            Submit
                        </Button>
                    ]}>
                    { form }
                </Modal>
            </div>
        }

    }

    return Wrapper;

}

interface IState {
    content: JSX.Element,
    showForm: boolean,
    dataSource: Array<{
        value: string,
        text: string
    }> 
}

interface IArguments {
    title?: string
    style?: object
}

interface IProps extends IArguments {
    show: boolean 
    onClose: Function
}