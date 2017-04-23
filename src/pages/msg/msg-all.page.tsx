import './msg-all.less'
import * as React from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb, Layout, Row, Col, Select, Icon, Card, Pagination, Spin, Tag } from 'antd';


import Image from '../../component/Image/Image.component';
import { Util } from '../../index.con';
import msgStore from '../../store/msg';
import userStore from '../../store/user';
import http from '../../services/http.service';

const { Header, Footer, Sider, Content } = Layout;

export default class msgAllPage extends React.PureComponent< IProps, IState > {

    private limit = 5;
    private sub: Subscription;

    constructor( ) {
        super( ); 
        this.state = {
            total: 0,
            msgList: [ ],
            spinning: false,
            currentPage: 1,
            msgType: '未读消息',
            selectorValue: 'false'
        }
    }

    componentDidMount( ) {
        if ( !!this.props.children ) {
            this.setState({
                msgType: '所有消息',
                selectorValue: 'true'
            })
            this.fetchMsgList( true, 1 )
        } else {
            this.fetchMsgList( false, 1 )
        }
        
        setTimeout(( ) => this.watchSOK( ), 200 )
    }

    componentWillUnmount( ) {
        this.sub.unsubscribe( );
    }

    watchSOK( ) {
        this.sub = msgStore.data.data$
            .filter( sok => sok !== null )
            .skip( 1 )
            .do( res => {
                let { currentPage, msgType, msgList } = this.state;
                this.fetchMsgList( msgType === '所有消息' ? true : false, currentPage );
            })
            .subscribe( )
    }

    fetchMsgList( readed: boolean, currentPage: number ) {
        console.log(`fetch: ${readed}`)
        this.setState({ spinning: true })

        let toUID: string;
        let { limit } = this;
        let skip = ( currentPage - 1 ) * limit;
        
        let sub = userStore.data.userData$
            .do( user => {
                toUID = user._id;
                setTimeout(( ) => Util.cancelSubscribe( sub ), 16 );
            }).subscribe( )

        let sub2 = http
            .post< API.Res.AllMsg, API.Query.AllMsg >('/api/v1/msg-list', { toUID, readed, skip, limit })
            .do( res => {
                this.setState({
                    spinning: false,
                    total: res.count,
                    msgList: res.data
                })
                setTimeout(( ) => Util.cancelSubscribe( sub2 ), 16 );
            })
            .subscribe( );
    }

    handleChange = ( readed: any ) => {
        this.setState({
            currentPage: 1,
            selectorValue: readed === 'false' ? 'false' : 'true',
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

    onEnter = ( msg: Partial<APP.Msg> , key: number ) => {
        
        /**路由推送 */
        this.props.router.push(`/msgs/${msg._id}`);

        /**右上角badge刷新 */
        setTimeout(( ) =>{
            msgStore.data.refresh( );
        }, 300 )

    }

    render( ) {
        console.log('render')
        let { msgType, total, currentPage, msgList, spinning, selectorValue } = this.state;

        let msgContent = <ul>
            {
                msgList.map(( msg, key ) => <li key={key}>
                    <a onClick={( ) => this.onEnter( msg, key )}>
                        <Image src="/static/touxiang.png" />
                        { !msg.readed && <Tag color="#108ee9" className="my-tag">未读</Tag> }
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
                                    <Select defaultValue="false" value={ selectorValue }  style={{ width: 120 }} onChange={this.handleChange}>
                                        <Select.Option value="false"><Icon type="tag-o" />{` `}未读消息</Select.Option>
                                        <Select.Option value="true"><Icon type="bell" />{` `}所有消息</Select.Option>
                                    </Select>
                                    <span style={{ color: '#666' }}>{ total }条</span>
                                </div>
                                <div className="content">
                                    <Spin spinning={ spinning } tip="Loading..."  size="large" className="my-spin">
                                        { msgContent }
                                    </Spin> 
                                </div>
                                <div className="page-content">
                                    <Pagination simple defaultCurrent={ 1 } total={ total } current={ currentPage }
                                        defaultPageSize={ 5 } onChange={ this.handleSelect } />
                                </div>
                            </div>
                        </Col>
                        <Col span={14} className="msg-content">{ this.props.children || 
                                <h3 className="tips">选择左侧消息，查看消息详情</h3> }</Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    }

}

interface IState {
    total: number
    spinning: boolean
    currentPage: number
    msgType: '所有消息' | '未读消息'
    selectorValue: 'false' | 'true'
    msgList: Array<Partial<APP.Msg>>
}

interface IProps extends RouteComponentProps<{},{}> {

}