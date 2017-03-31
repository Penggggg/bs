import * as React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router';

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

    render( ) {
        let { showBar } = this.state;
        return <div className="app-page">
            { 
                !!showBar ?
                    <Layout className="my-layout" style={{ minHeight: '600px', background: '#fff' }}>
                        <Header className="my-header" >
                            <Row>
                                <Col span={8}>
                                    123
                                </Col>
                                <Col span={16} >
                                    <Menu theme="light" mode="horizontal" className="my-menu">
                                        <Menu.Item key="1">我的</Menu.Item>
                                        <Menu.Item key="2">日历</Menu.Item>
                                        <Menu.Item key="3">消息</Menu.Item>
                                    </Menu>
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
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