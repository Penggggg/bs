import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MsgPopBadge } from '../containers/msg/msgListPopBadge.container';
import { Layout, Menu, Breadcrumb, Row, Col, Icon, Input, Badge , Popover   } from 'antd';


import Auth  from '../services/auth-login.service';
import './app.less'

const { Header, Content, Footer } = Layout;


export default class AppPage extends React.PureComponent< RouteComponentProps<{},{}>, IState > {
    
    constructor( ) {
        super( );
        this.state = {
            showBar: true
        }
    }
    
    componentWillMount( ) {
       let { pathname } = this.props.location;
       this.analyseShowBar( pathname );
       this.initStore( )
    }

    private initStore = ( ) => {
        if ( process.env.NODE_ENV === 'development') {
            console.log(`是否已本地登录：${Auth.isLogin( )}`)
        }   
        if (Auth.isLogin( )) {
            Auth.signIn(Auth.userData( ));
        }
    }

    componentWillReceiveProps( newProps ) {
        let { pathname } = newProps.location;
        this.analyseShowBar( pathname );
    }

    private analyseShowBar( pathname: string ) {
        this.setState({
            showBar: pathname === '/login' ? false : true
        })
    }

    onEnter = ( p ) => {

        switch( p.key ) {
            case "5": {
                this.props.router.push('/user');
                break;
            };
            default: return 
        }

    }

    render( ) {
        let { showBar } = this.state;
        return <div className="app-page">
            { 
                !!showBar ?
                    <Layout className="my-layout" style={{ minHeight: '600px', background: '#fff' }}>
                        <Header className="my-header" >
                            <Row>
                                <Col span={18}>
                                    <h3 className="my-logo"><span><Icon type="api" /></span>iTeam<small>团队协作工具</small></h3>
                                    
                                    <Input.Search placeholder="在个人项目中搜索" style={{ width: 200 }}  
                                        onSearch={value => console.log(value)}/>
                                </Col>
                                <Col span={6} >
                                    <Menu theme="light" mode="horizontal" className="my-menu" onClick={this.onEnter}>
                                        <Menu.Item key="1">我的</Menu.Item>
                                        <Menu.Item key="2">帮助</Menu.Item>
                                        <Menu.Item key="3"><Icon type="exception" /></Menu.Item>
                                        <Menu.Item key="4">
                                            <MsgPopBadge content={<Icon type="aliwangwang-o" />} />
                                        </Menu.Item>
                                        <Menu.Item key="5"><img src="/static/touxiang.png"  /></Menu.Item>
                                    </Menu>
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{  }}>
                                { this.props.children }
                        </Content>
                    </Layout>
                :
                    <div style={{ minHeight: '600px' }}>{ this.props.children }</div>
             }
        </div>
    }
}

interface IState {
    showBar: boolean
}