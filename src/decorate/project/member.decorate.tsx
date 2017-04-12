import * as React from 'react';
import * as ReactDom from 'react-dom';


export let InjectMember = ( Slider ) => {

    class Wrapper extends React.PureComponent< IProps, { }> {

        private dom: Element;
        private container: Element;

        constructor( ) {
            super( );
        }

        componentWillMount( ) {
            
        }

        componentWillUnmount( ) {
            
        }
        
        render( ) {
            let { show, onClose } = this.props;
            return <Slider title='项目成员' content={<div>123123</div>} {...this.props}/>
        }

    }

    return Wrapper;

}


interface IArguments {
    title?: string
    style?: object
}

interface IProps extends IArguments {
    show: boolean 
    onClose: Function
}