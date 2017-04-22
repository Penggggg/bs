import './msg-all.less'
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb, Layout, Row, Col, Select, Icon, Card, Pagination   } from 'antd';


import Image from '../../component/Image/Image.component';
import { Util } from '../../index.con';
import msgStore from '../../store/msg';
import userStore from '../../store/user';
import http from '../../services/http.service';

const { Header, Footer, Sider, Content } = Layout;

export default class msgAllPage extends React.PureComponent< IProps, IState > {

    private limit = 5;

    constructor( ) {
        super( ); 
        this.state = {
            total: 5,
            msgList: [ ],
            currentPage: 1,
            msgType: '未读消息'
        }
    }

    componentDidMount( ) {
        this.fetchMsgList( false, 1 );
    }

    fetchMsgList( readed: boolean, currentPage: number ) {
        let toUID: string;
        let { limit } = this;
        let skip = ( currentPage - 1 ) * limit;
        
        let sub = userStore.data.userData$
            .do( user => {
                toUID = user._id;
                setTimeout(( ) => Util.cancelSubscribe( sub ), 16 );
            }).subscribe( )

        http
            .post<API.Res.AllMsg>('/api/v1/msg-list', { toUID, readed, skip, limit } as API.Query.AllMsg)
            .do( res => {
                let { data, count } = res;
                this.setState({
                    total: count,
                    msgList: data
                })
            })
            .subscribe( );
    }

    handleChange = ( readed: any ) => {
        this.setState({
            currentPage: 1,
            msgType: readed === 'false' ? '未读消息' : '所有消息'
        })
        this.fetchMsgList(  readed === 'false' ? false : true, 1 );

    }

    handleSelect = ( currentPage: number ) => {
        let { msgType } = this.state;
        this.setState({
            currentPage
        })
        this.fetchMsgList( msgType === '未读消息' ? false : true, currentPage );
    }

    render( ) {

        let { msgType, total, currentPage, msgList } = this.state;

        let msgContent = <ul>
            {
                msgList.map(( msg, key ) => <li key={key}>
                    <a onClick={() => console.log(key)}>
                        <Image src="/static/touxiang.png" />
                        <h3>{ msg.title }</h3>
                        <p>{ msg.content }</p>
                        <span className="time">{(new Date(msg.meta.createdTime)).toLocaleString( )}</span>
                    </a>
                </li>)
            }
        </ul>

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
                                    <Select defaultValue="false" style={{ width: 120 }} onChange={this.handleChange}>
                                        <Select.Option value="false"><Icon type="tag-o" />{` `}未读消息</Select.Option>
                                        <Select.Option value="true"><Icon type="bell" />{` `}所有消息</Select.Option>
                                    </Select>
                                    <span style={{ color: '#666' }}>{ total }条</span>
                                </div>
                                <div className="content">
                                    { msgContent }
                                </div>
                                <div className="page-content">
                                    <Pagination simple defaultCurrent={ 1 } total={ total } current={ currentPage }
                                        defaultPageSize={ 5 } onChange={ this.handleSelect } />
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
    total: number
    currentPage: number
    msgType: '所有消息' | '未读消息'
    msgList: Array<Partial<APP.Msg>>
}

interface IProps extends RouteComponentProps<{},{}> {

}