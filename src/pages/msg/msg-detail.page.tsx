import './msg-detail.less';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import http from '../../services/http.service';

export default class MsgDetailPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
    }

    componentDidMount( ) {
        let { id } = this.props.params;
        // this.fetchMsgDetail( id );
    }

    fetchMsgDetail( id: string ) {
        http
            .get<API.Res.MsgDetail, API.Query.MsgDetail>('/api/v1/msg-detail', { _id: id })
            .do( res => {
                console.log( res )
            })
            .subscribe( )
    }

    render( ) {
        let { id } = this.props.params;
        return <div className="msg-detail-page">
            { id }
        </div>
    }

}

interface IProps extends RouteComponentProps<{ id:string }, { }> {

}

interface IState {

}