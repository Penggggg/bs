import * as React from 'react';
import { Subscription } from 'rxjs';
import MyBread from '../../component/Bread/Bread.component';
import projectStore  from '../../store/project';

export let InjectProjectBread = ( Bread ) => {

    class Wrapper extends React.PureComponent< IProps, IState > {

        private sub: Subscription;

        constructor( ){
            super( );
            this.state = {
                projectName: ''
            }
        }

        componentDidMount( ) {
            let timer = setInterval(( ) => {
                if ( !!projectStore.data.data$ ) {
                    this.watchProject( );
                    clearInterval( timer );
                }
            }, 30 )
        }

        watchProject = ( ) => {
            this.sub = projectStore.data.data$
                .do( project => {
                    this.setState({
                        projectName: project.name
                    })
                })
                .subscribe( )
        }

        componentWillUnmount( ) {
            this.sub.unsubscribe( );
        }

        render( ) {
            
            let { projectName } = this.state;
            return <Bread data={[
                { name: 'Home' },
                { name: '所有项目', href: '/#/projects' },
                { name: projectName }
            ]} />
        }


    }

    return Wrapper
}

interface IState {
    projectName: string

}

interface IProps {
    data?: Array<{
        name: string
        href?: string
    }>
}