import './index.less'
import * as React from 'react';
import { Spin, Col, DatePicker, Row } from 'antd';

import http from '../../services/http.service';


export class TaskDetail extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            task: null,
            spinning: true
        }
    }

    componentDidMount( ) {
        console.log( this.props )
    }

    render( ) {

        let { tid } = this.props;
        let { spinning, task } = this.state;

        return <div>
            <Spin spinning={ spinning }>
            {
                task ? 
                <div>
                    <h1>{ task.title }</h1>
                    <Row className="header-bar">
                        <Col span={ 8 }>
                            <p>执行者</p>
                            { task.executorsID.map( user => user.name ) }
                        </Col>
                        <Col span={ 8 }>
                            <p>截止时间</p>
                            <DatePicker placeholder="点击设置" defaultValue={null} />
                        </Col>
                        <Col span={ 8 }>
                            <p>优先级</p>
                        </Col>
                    </Row>
                </div>
                : ''
            }
            </Spin>
        </div>
    }

}

interface IState {
    spinning: boolean
    task: Schema.Task$ | null
}

interface IProps {

    tid: string

}