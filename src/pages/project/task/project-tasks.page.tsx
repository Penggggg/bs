
import './tasks.less';
import * as React from 'react';


export default class ProjectTasksPage extends React.PureComponent<{ }, { }> {

    constructor( ) {
        super( );
    }

    render( ) {
        return <div className="project-tasks-page">
            <ul className="groups-container">
                <li className=" group">
                    <p>新建项目分组</p>
                </li>
                <li className="add-group group">
                    <p>新建项目分组</p>
                </li>
            </ul>
        </div>
    }

}