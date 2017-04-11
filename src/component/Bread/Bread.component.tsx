
import * as React from 'react';
import { Breadcrumb } from 'antd';

export default ({ data }: IProps ) => {
    return <Breadcrumb>
        {
            data.map(( bread, key ) => {
                return bread.href ? 
                    <Breadcrumb.Item href={ bread.href } key={ key }>
                        { bread.name }
                    </Breadcrumb.Item>
                :
                    <Breadcrumb.Item key={ key }>
                        { bread.name }
                    </Breadcrumb.Item>
            })
        }
    </Breadcrumb>
}

interface IProps {
    data: Array<{
        name: string
        href?: string
    }>
}

