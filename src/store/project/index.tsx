import ProjectRole from './role.store';
import ProjectData from './data.store';

class ProjectStore {

    public role = new ProjectRole( );
    public data = new ProjectData( );


}

export default new ProjectStore( )

