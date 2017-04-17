import * as React from 'react';
import { Badge, Popover, Icon   } from 'antd';

import http from '../../services/http.service';


export class PopoverBadge extends React.PureComponent< IProps, { }> {

    constructor( ) {
        super( );
    }

    componentDidMount( ) {
        this.fetchMsg( );
    }

    fetchMsg( ) {
        
    }

    render( ) {
        let { content, popContent, count, placement } = this.props;
        return <Popover content={ popContent } placement={ placement }>
            <Badge count={ count }>
                { content }
            </Badge>
        </Popover >
    }

}

interface IProps {
    count: number
    placement: any
    content: React.ReactNode
    popContent: React.ReactNode
}
