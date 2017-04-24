import './msg-detail.less';
import * as React from 'react';
import { Spin, Button } from 'antd';
import { RouteComponentProps } from 'react-router';

import { ENUM } from '../../index.con';
import http from '../../services/http.service';

export default class MsgDetailPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            spinning: false,
            msgDetail: null,
            rejectBtnLoading: false,
            resolveBtnLoading: false
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

        this.setState({
            spinning: true
        })

        http
            .get<API.Res.MsgDetail, API.Query.MsgDetail>('/api/v1/msg-detail', { id })
            .do( res => {
                this.setState({
                    msgDetail: res,
                    spinning: false
                })
            })
            .subscribe( )
    }

    replyTwoChoice = ( answer: boolean, replyURL: string, mid: string | Partial<APP.Msg> ) => {
        
        this.controllLoading( answer ? 'resolveBtn' : 'rejectBtn', true );

        let sub = http
            .post<API.Res.ReplyInvite, API.Query.ReplyInvite>( replyURL, { answer, mid })
            .do( res => {
                console.log( res );
                setTimeout(( ) => sub.unsubscribe, 100 );
            })
            .subscribe( )
    }

    controllLoading = ( target: 'resolveBtn' | 'rejectBtn', value: boolean ) => {
        switch ( target ) {
            case 'resolveBtn': {
                this.setState({
                    resolveBtnLoading: value
                })
                break;
            }
            case 'rejectBtn': {
                this.setState({
                    rejectBtnLoading: value
                })
                break;
            }
        }
    }

    render( ) {
        let { msgDetail, spinning, resolveBtnLoading, rejectBtnLoading } = this.state;

        return <div className="msg-detail-page">
            { !!msgDetail &&
                <div className="msg-block">
                    <Spin spinning={ spinning } size="large" >
                        <h3>{ msgDetail.title }</h3>
                        <p className="content">{ msgDetail.content }</p>
                        <p className="name">By: { msgDetail.fromUID.name }</p>
                        <p className="time">{ (new Date( msgDetail.meta.createdTime )).toLocaleString( )}</p>

                        <div style={{ paddingTop: 30 }}>
                            { msgDetail.formType === ENUM.MsgFormType.twoChoice &&
                                <div className="two-choice-form">
                                    <Button onClick={( ) => this.replyTwoChoice( false, msgDetail.replyURL, msgDetail._id )}
                                        loading={ rejectBtnLoading }
                                        type="danger" size="large" icon="left-circle-o">拒绝邀请</Button>
                                    <Button onClick={( ) => this.replyTwoChoice( true, msgDetail.replyURL, msgDetail._id )}
                                        loading={ resolveBtnLoading }
                                        type="primary" size="large" icon="right-circle-o">答应邀请</Button>
                                </div>}
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
    rejectBtnLoading: boolean
    resolveBtnLoading: boolean
    msgDetail: null | APP.Msg
}