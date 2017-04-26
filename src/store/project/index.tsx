import ProjectRole from './role.store';
import ProjectData from './data.store';
import { ProjectChat } from './chat.store';

class ProjectStore {

    public role = new ProjectRole( );
    public data = new ProjectData( );
    public chat = new ProjectChat( );

}

export default new ProjectStore( )

