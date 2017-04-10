import ProjectRole from './role.store';
import ProjectData from './data.store';

class ProjectStore {

    public role;
    public data;

    constructor( ) {
        this.role = new ProjectRole( );
        this.data = new ProjectData( );
    }

}

export default new ProjectStore( )

