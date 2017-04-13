import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Icon, Modal, Button, Mention } from 'antd';

import Image from '../../component/Image/Image.component';
import { Subscription } from 'rxjs';
import projectStore from '../../store/project';

const { toString, toEditorState } = Mention;

export let InjectMember = ( Slider ) => {

    class Wrapper extends React.PureComponent< IProps, IState > {

        private dom: Element;
        private container: Element;
        private sub: Subscription;

        constructor( ) {
            super( );
            this.state = {
                content: <div><ul></ul></div>,
                showForm: false
            }
        }

        componentWillMount( ) {
            let timer = setInterval(( ) => {
                if ( !!projectStore.data.data$ ) {
                    this.watchProject( );
                    clearInterval( timer );
                }
            }, 30 )
        }

        componentWillUnmount( ) {
            this.sub.unsubscribe( );
        }

        addNewMember = ( ) => {
            this.setState({
                showForm: true
            })
        }

        submitHandler = ( ) => {

        }

        watchProject = ( ) => {
            this.sub = projectStore.data.data$
                .do( project => {
                    let { creator, member, leader } = project;
                    this.setState({
                        content: <div><ul>
                            <li className="btn" style={{ paddingLeft: 0 }} onClick={ this.addNewMember }>
                                <Icon type="plus-circle" />
                                <a>邀请新成员</a>
                            </li>
                            {
                                <li>
                                    <Image src="/static/touxiang.png" />
                                    <h3>{ creator.name }</h3>
                                    <p>{ creator.phone }</p>
                                </li>
                            }
                        </ul></div>
                    })
                })
                .subscribe( )
        }
        
        render( ) {

            let { content, showForm } = this.state;
            let form = <div className="modal-resetpsw-form">
                <h3>账号邀请</h3>
                <Mention 
                    style={{ zIndex: 100 }}
                    prefixCls='@'
                    defaultValue={toEditorState('@afc163')}
                    suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']} />
                <div className="modal-img"><img src="/static/jielibang.png" alt=""/></div>
            </div>

            return <div>
                <Slider title='项目成员' content={ content } {...this.props}/>
                <Modal title='邀请新成员' visible={ showForm }
                    onOk={( ) => this.setState({ showForm: true})} 
                    onCancel={( ) => this.setState({ showForm: false})}
                    style={{ width: '400px !import', padding: '0 85px', marginTop: '-40px' }}
                    footer={[
                        <Button key="back" size="large" onClick={( ) => this.setState({ showForm: false })} >Cacel</Button>,
                        <Button key="submit" type="primary" size="large" onClick={ this.submitHandler }>
                            Submit
                        </Button>
                    ]}>
                    { form }
                </Modal>
            </div>
        }

    }

    return Wrapper;

}

interface IState {
    content: JSX.Element,
    showForm: boolean 
}

interface IArguments {
    title?: string
    style?: object
}

interface IProps extends IArguments {
    show: boolean 
    onClose: Function
}