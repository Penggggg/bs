import * as React from 'react';


export let InjectMsgList = ( PopoverBadge ) => {

    class Wrapper extends React.PureComponent< Iprops, IState> {

        constructor( ) {
            super( );
            this.state = {
                count: 10,
                popContent: <div></div>
            }
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