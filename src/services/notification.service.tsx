import * as React from 'react';
import { notification, Icon } from 'antd';


import { myNotification as n } from '../interface/service.interface';

class NotificationService implements n.INotificationService {

    public open({ title, msg, type = 'ok' }: n.IOpenArguments) {
        notification.open({
            message: title,
            description: msg,
            icon: <Icon type={ type === 'ok' ? "smile" : "frown" } style={{ color: '#108ee9' }} />,
        }); 
    }

}

export default new NotificationService( );