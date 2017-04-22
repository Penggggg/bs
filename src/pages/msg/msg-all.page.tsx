import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb, Layout, Row, Col, Select, Icon, Card, Pagination   } from 'antd';

import './msg-all.less'

const { Header, Footer, Sider, Content } = Layout;

export default class msgAllPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( ); 
        this.state = {
            msgType: '未读消息'
        }
    }

    componentDidMount( ) {

    }

    handleChange = ( noReaded: any ) => {
        this.setState({
            msgType: noReaded === 'true' ? '未读消息' : '所有消息'
        })

    }

    render( ) {

        let { msgType } = this.state;

        return <div className="msg-all-page">
            <Layout>
                <Header>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/#/projects">项目</Breadcrumb.Item>
                        <Breadcrumb.Item>我的消息</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content>
                    <Row>
                        <Col span={10} className="msg-list-block">
                            <div className="msg-list">
                                <div className="title">
                                    <Select defaultValue="true" style={{ width: 120 }} onChange={this.handleChange}>
                                        <Select.Option value="true"><Icon type="tag-o" />{` `}未读消息</Select.Option>
                                        <Select.Option value="false"><Icon type="bell" />{` `}所有消息</Select.Option>
                                    </Select>
                                </div>
                                <div className="content">
                                
                                </div>
                                <div className="page-content">
                                    <Pagination defaultCurrent={1} total={43} defaultPageSize={8} />
                                </div>
                            </div>
                        </Col>
                        <Col span={14} className="msg-content">{ this.props.children }??</Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    }

}

interface IState {
    msgType: '所有消息' | '未读消息'
}

interface IProps extends RouteComponentProps<{},{}> {

}