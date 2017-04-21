import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import './msg-all.less'

export default class msgAllPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( ); 
    }

    render( ) {
        return <div className="msg-all-page">
            我是msg-all
        </div>
    }

}

interface IState {

}

interface IProps extends RouteComponentProps<{},{}> {

}