import './msg-detail.less';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import http from '../../services/http.service';

export default class MsgDetailPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            msgDetail: null
        }
    }

    componentDidMount( ) {
        let { id } = this.props.params;
        this.fetchMsgDetail( id );
    }

    componentWillReceiveProps( np ) {
        let { id } = np.params;
        this.fetchMsgDetail( id );       
    }

    fetchMsgDetail( id: string ) {
        http
            .get<API.Res.MsgDetail, API.Query.MsgDetail>('/api/v1/msg-detail', { id })
            .do( res => {
                console.log( res );
                this.setState({
                    msgDetail: res
                })
            })
            .subscribe( )
    }

    render( ) {
        let { msgDetail } = this.state;
        return <div className="msg-detail-page">
            { !!msgDetail &&
                <div className="msg-block">
                    <h3>{ msgDetail.title }</h3>
                    <p className="content">{ msgDetail.content }</p>
                    <p className="time">{ (new Date( msgDetail.meta.createdTime )).toLocaleString( )}</p>
                    <p className="name">{ msgDetail.fromUID.name }</p>
                    
                </div>}
        </div>
    }

}

interface IProps extends RouteComponentProps<{ id:string }, { }> {

}

interface IState {
    msgDetail: null | APP.Msg
}