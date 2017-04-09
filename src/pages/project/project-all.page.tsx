import * as React from 'react';
import { Card, Icon } from 'antd';
import Image from '../../component/Image/Image.component';


import './project-all.less';


export default class ProjectAllPage extends React.PureComponent<{ }, { }> {

    constructor( ) {
        super( );
    }

    render ( ) {
        return <div className="project-all-page">
            <div className="my-project">
                <div className="title">
                    <h2>我已拥有的项目</h2>
                    <span></span>
                </div>
                <div className="projects-block">
                    <Card className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                     <Card  className="project-card add-project-card"  bodyStyle={{ padding: 0, height: '100%'}}>
                        <Icon type="plus-circle" className="icon" />
                        <p>创建新项目</p>
                    </Card>
                </div>
            </div>
            <div className="all-project">
                <div className="title">
                    <h2>全部的项目</h2>
                    <span></span>
                </div>
                <div className="projects-block">
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                    <Card  className="project-card" bodyStyle={{ padding: 0, height: '100%'}}>
                        <div className="image">
                            <Image alt="example" src="/static/cover-project.jpg" />
                        </div>
                        <div className="info">
                            <h3>Europe Street beat</h3>
                            <p>www.instagram.com</p>
                        </div>
                     </Card>
                </div>
            </div>
        </div>
    }

}