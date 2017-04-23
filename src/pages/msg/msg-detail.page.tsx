import './msg-detail.less';
import * as React from 'react';
import { Spin } from 'antd';
import { RouteComponentProps } from 'react-router';

import { ENUM } from '../../index.con';
import http from '../../services/http.service';

export default class MsgDetailPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            spinning: false,
            msgDetail: null
        }
    }

    componentDidMount( ) {
        let { id } = this.props.params;
        this.fetchMsgDetail( id );
        console.log('首次')
    }

    componentWillReceiveProps( np ) {
        let { id } = np.params;
        this.fetchMsgDetail( id );  
        console.log('2次')     
    }

    fetchMsgDetail( id: string ) {

        this.setState({
            spinning: true
        })

        http
            .get<API.Res.MsgDetail, API.Query.MsgDetail>('/api/v1/msg-detail', { id })
            .do( res => {
                // console.log( res );
                this.setState({
                    msgDetail: res,
                    spinning: false
                })
            })
            .subscribe( )
    }

    render( ) {
        let { msgDetail, spinning } = this.state;
        return <div className="msg-detail-page">
            { !!msgDetail &&
                <div className="msg-block">
                    <Spin spinning={ spinning } size="large" >
                        <h3>{ msgDetail.title }</h3>
                        <p className="content">{ msgDetail.content }</p>
                        <p className="name">By: { msgDetail.fromUID.name }</p>
                        <p className="time">{ (new Date( msgDetail.meta.createdTime )).toLocaleString( )}</p>

                        <div>
                            { msgDetail.formType === ENUM.MsgFormType.twoChoice &&
                                <div>

                                </div> }
                        </div>
                    </Spin>
                </div>}
        </div>
    }

}

interface IProps extends RouteComponentProps<{ id:string }, { }> {

}

interface IState {
    spinning: boolean
    msgDetail: null | APP.Msg
}