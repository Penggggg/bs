import * as React from 'react';
import { Link } from 'react-router'; 
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
            this.sub = msgStore.data.data$
                .filter( res => res !== null )
                .do( res => {
                    this.handleMsgList( res.data, res.total )
                })
                .subscribe( )
        }

        handleMsgList = ( list: Array<Partial<APP.Msg>>, count: number ) => {
            this.setState({
                count,
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
                        <Link to="/msgs">查看更多</Link>
                    </ul>

            return <PopoverBadge {...this.props} count={ count } popContent={ popContent }
                        placement="bottom" 
                        title="未读消息" 
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