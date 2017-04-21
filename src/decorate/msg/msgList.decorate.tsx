import * as React from 'react';
import { Subscription, Observable } from 'rxjs';

import { Util } from '../../index.con';
import userStore from '../../store/user';
import msgStore from '../../store/msg';
import http from '../../services/http.service';

import Image from '../../component/Image/Image.component';

type partialMsgArr = Array<Partial<APP.Msg>>;

export let InjectMsgList = ( PopoverBadge ) => {

    class Wrapper extends React.PureComponent< Iprops, IState> {

        private sub: Subscription;

        constructor( ) {
            super( );
            this.state = {
                count: 0,
                msgList: [ ] 
            }
        }

        componentDidMount( ) {
            this.combineFlow( );
        }
        

        componentWillUnmount( ) {
            Util.cancelSubscribe( this.sub )
        }

        combineFlow( ) {
            this.sub = userStore.data.userData$
                .do( user => {
                    http
                        .get<partialMsgArr>('/api/v1/msg-list', { toUID: user._id, readed: false } as Partial<APP.Msg>)
                        .combineLatest(msgStore.data.data$)
                        .do( res => {
                            let { msgList } = this.state;
                            let [ fromFetch, fromSOK ] = res;

                            if ( fromSOK === null ) {
                                this.handleMsgList( fromFetch )
                            } else {
                                this.handleMsgList([ fromSOK, ...msgList ])
                            }
                        })
                        .subscribe( )
                }) 
                .subscribe( )
        }

        handleMsgList = ( list: Array<Partial<APP.Msg>> ) => {
            this.setState({
                count: list.length,
                msgList: list
            })
        }

        render( ) {
            let { msgList, count } = this.state;
            let a = [...msgList]
            let partialList = a.slice( 0, 3 );

            let popContent = 
                    <ul>
                        {
                            partialList.map(( msg, key ) => <li key={key}>
                                <Image src="/static/touxiang.png" />
                                <h3>{ msg.title }</h3>
                                <p>{ msg.content }</p>
                                <span className="time">{(new Date(msg.meta.createdTime)).toLocaleString( )}</span>
                            </li>)
                        }
                        <a>查看更多</a>
                    </ul>

            return <PopoverBadge {...this.props} count={ count } popContent={ popContent }
                        placement="bottom" 
                        title="消息" 
                        className="my-nav-pop" />
        }

    }

    return Wrapper

}

interface IState {
    count: number
    msgList: Array<Partial<APP.Msg>>
}

interface Iprops {
    content: React.ReactNode
}