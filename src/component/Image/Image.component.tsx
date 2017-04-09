import * as React from 'react';
import './Image.less';

export default class Image extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            imgLoaded: false
        }
    }

    onLoadHandler = ( ) => {
        this.setState({
            imgLoaded: true
        })
    }

    render( ) {
        let { imgLoaded } = this.state;
        let { src, alt = '' } = this.props;
        return <img src={ src } alt={ alt } onLoad={ this.onLoadHandler } className={ imgLoaded ? "my-img loaded" : "my-img" } />
    }

}

interface IProps {
    style?: object,
    src: string,
    alt?: string
}

interface IState {
    imgLoaded: boolean
}