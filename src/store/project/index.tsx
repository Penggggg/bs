import ProjectRole from './role.store';
import ProjectData from './data.store';
import { ProjectChat } from './chat.store';
import { ProjectFile } from './file.store';

class ProjectStore {

    public role = new ProjectRole( );
    public data = new ProjectData( );
    public chat = new ProjectChat( );
    public file = new ProjectFile( );
}

export default new ProjectStore( )

