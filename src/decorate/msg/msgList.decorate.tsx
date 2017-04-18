import * as React from 'react';
import { Subscription } from 'rxjs';

import { Util } from '../../index.con';
import userStore from '../../store/user';
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
                popContent: <div></div>
            }
        }

        componentDidMount( ) {
            this.fetchMsgList( );
        }

        componentWillUnmount( ) {

        }

        fetchMsgList( ) {
            
            let sub = userStore.data.userData$
                .do( user => {
                    let sub2 = http
                        .get<partialMsgArr>('/api/v1/msg-list', { toUID: user._id, readed: false } as Partial<APP.Msg>)
                        .do( res => {
                            console.log( res )
                            this.handleMsgList( res )
                            Util.cancelSubscribe( sub, sub2 );
                        })
                        .subscribe( )
                })
                .subscribe( )
        }

        handleMsgList = ( list: partialMsgArr ) => {
            let partialList = list.slice( 0, 3 )
            this.setState({
                count: list.length,
                popContent: 
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
            })
        }

        render( ) {
            return <PopoverBadge {...this.props} {...this.state} placement="bottom" title="消息" className="my-nav-pop" />
        }

    }

    return Wrapper

}

interface IState {
    count: number
    popContent: React.ReactNode
}

interface Iprops {
    content: React.ReactNode
}