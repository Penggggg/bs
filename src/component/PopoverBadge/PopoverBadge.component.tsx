import * as React from 'react';
import { Badge, Popover, Icon   } from 'antd';

import http from '../../services/http.service';
import './index.less'

export class PopoverBadge extends React.PureComponent< IProps, { }> {

    constructor( ) {
        super( );
    }

    render( ) {
        let { content, popContent, count, placement, title, className } = this.props;
        return <Popover content={ popContent } placement={ placement } title={ title } overlayClassName={className} >
            <Badge count={ count }>
                <div>
                    { content }
                </div>
            </Badge>
        </Popover >
    }

}

interface IProps {
    count: number
    placement: any
    className: string
    content: React.ReactNode
    popContent: React.ReactNode
    title: React.ReactNode | null
}
