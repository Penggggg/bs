import * as React from 'react';
import './project-all.less';


export default class ProjectAllPage extends React.PureComponent<{ }, { }> {

    constructor( ) {
        super( );
    }

    render ( ) {
        return <div className="project-all-page">
            <div className="my-project">
                <div className="title">
                    <h2>我已拥有的项目</h2>
                    <span></span>
                </div>
                <div className="projects-block">

                </div>
            </div>
            <div className="all-project">
                <div className="title">
                    <h2>全部的项目</h2>
                    <span></span>
                </div>
            </div>
        </div>
    }

}