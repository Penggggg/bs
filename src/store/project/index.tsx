import ProjectRole from './role.store';
import ProjectData from './data.store';
import { ProjectChat } from './chat.store';
import { ProjectFile } from './file.store';
import { ProjectGroup } from './group.store';
import { ProjectSchedule } from './schedule.store';

class ProjectStore {

    public role = new ProjectRole( );
    public data = new ProjectData( );
    public chat = new ProjectChat( );
    public file = new ProjectFile( );
    public group = new ProjectGroup( );
    public schedule = new ProjectSchedule( );
}

export default new ProjectStore( )

