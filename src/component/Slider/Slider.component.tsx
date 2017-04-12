import * as React from 'react';
import { Icon } from 'antd';
import * as ReactDom from 'react-dom';

import './Slider.less';


export default class Slider extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
    }
    
    render( ) {
        let { content, style, title, show, onClose } = this.props;
        return <div className={ show? 'c-Slider show' : 'c-Slider' } style={ style } >
            <div className="title">
                <h3>{ title }</h3>
                <Icon type="close" onClick={( ) => onClose( )}/>
            </div>
            <div className="content">
                { content }
            </div>
        </div>
    }

}


interface IState {
    opened: boolean
}

interface IProps {
    show: boolean
    title?: string
    style?: object
    onClose: Function
    content: React.ReactElement<{ }>
}