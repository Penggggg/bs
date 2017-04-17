import * as React from 'react';
import { Subscription } from 'rxjs';

import http from '../../services/http.service';
import userStore from '../../store/user';

type partialMsgArr = Array<Partial<APP.Msg>>;

export let InjectMsgList = ( PopoverBadge ) => {

    class Wrapper extends React.PureComponent< Iprops, IState> {

        private sub: Subscription;

        constructor( ) {
            super( );
            this.state = {
                count: 10,
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
                            this.handleMsgList( res )
                            setTimeout(( ) => {
                                sub.unsubscribe( );
                                sub2.unsubscribe( );
                            }, 16 )
                        })
                        .subscribe( )
                })
                .subscribe( )
        }

        handleMsgList = ( list: partialMsgArr ) => {
            this.setState({
                count: list.length,
                popContent: <div>
                    <ul>
                        {
                            list.map(( msg, key ) => <li key={key}>
                                <h3>{ msg.title }</h3>
                                <p>{ msg.content }</p>
                            </li>)
                        }
                    </ul>
                </div>
            })
        }

        render( ) {
            return <PopoverBadge {...this.props} {...this.state} placement="bottom" />
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