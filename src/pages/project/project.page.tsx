import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Layout, Row, Col, Breadcrumb, Menu, Icon } from 'antd';

import './project.less';
import http from '../../services/http.service';
import projectStore from '../../store/project';
import { IProject } from '../../interface/app.interface';
import { ProjectBread } from '../../containers/project/bread.container';


const { Header, Footer, Sider, Content  } = Layout;

export default class ProjectPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            menuKey: 'tasks'
        }
    }

    componentWillMount( ) {
        let { id } = this.props.params;
        http.get<IProject>(`/api/v1/project/${id}`)
            .do(e => projectStore.data.save( e ))
            .subscribe( )

        this.setMenuKey( );
    }

    setMenuKey = ( ) => {
        let { pathname } = this.props.location;
        if ( pathname.indexOf('tasks') !== -1 ) {
            this.setState({ menuKey: 'tasks' })
        } else if (pathname.indexOf('shares') !== -1  ) {
            this.setState({ menuKey: 'shares' })
        } else if (pathname.indexOf('files') !== -1  ) {
            this.setState({ menuKey: 'files' })
        } else if (pathname.indexOf('schedules') !== -1  ) {
            this.setState({ menuKey: 'schedules' })
        } else if (pathname.indexOf('chats') !== -1  ) {
            this.setState({ menuKey: 'chats' })
        }
    }

    componentDidMount( ) {

    }


    onEnter = ( item ) => {
        let { id } = this.props.params;
        this.props.router.push(`/project/${id}/${item.key}`);
    }

    render( ) {
        let { menuKey } = this.state;
        console.log( menuKey )
        return <div className="project-page">
            <Layout className="my-layout">
                <Header className="my-header">
                    <Row>
                        <Col span={8} className="bread-block">
                            <ProjectBread />
                        </Col>
                        <Col span={10} className="menu-block">
                            <Menu mode="horizontal" defaultSelectedKeys={[ menuKey ]} onSelect={this.onEnter}>
                                <Menu.Item key="tasks">
                                    任务 </Menu.Item>
                                <Menu.Item key="shares">
                                    分享 </Menu.Item>
                                <Menu.Item key="files">
                                    文件 </Menu.Item>
                                <Menu.Item key="schedules">
                                    日程 </Menu.Item>
                                <Menu.Item key="chats">
                                    群聊  </Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={6} className="project-detail-block">
                            <a><Icon type="user"  />成员</a>
                            <a><Icon type="area-chart" />数据</a>
                            <a><Icon type="setting" />设置</a>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    { this.props.children }
                </Content>
            </Layout>   
        </div>
    }

}


interface IProps extends RouteComponentProps<{ id:string }, { }> {

}

interface IState {
    menuKey: 'tasks'| 'shares' | 'files' | 'schedules' | 'chats'
}