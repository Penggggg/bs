import * as React from 'react';;


export default class AppPage extends React.PureComponent<{ }, { }> {
    
    constructor( ) {super( );}

    render( ) {
        return <div>{ this.props.children }</div>
    }
}