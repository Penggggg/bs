import './index.less';
import * as React from 'react';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { Icon, Modal, Input, Row, Col, DatePicker, TimePicker, Button, Select ,Tooltip, Spin } from 'antd';



import userStore from '../../../store/user';
import http from '../../../services/http.service';
import projectStore from '../../../store/project';
import ls from '../../../services/local-storage.service';
import Image from '../../../component/Image/Image.component';

const Option = Select.Option;

export default class ProjectSchedulesPage extends React.PureComponent< IProps, IState > {

    private sub: Subscription;
    private flow: Subscription;
    private user: APP.User;
    private project: APP.Project;

    constructor( ) {
        super( );
        this.state = {
            showForm: false,
            dataSource: [ ],
            formTitle: '',
            formPlace: '',
            formEndDate: null,
            formStartDate: null,
            formEndTime: null,
            formStartTime: null,
            formSelect: [],
            scheduleList: [],
            loading: true
        }
    }

    componentDidMount( ) {
        this.initData( );
        this.combineFlow( );
    }

    componentWillUnmount( ) {
        this.sub.unsubscribe( );
        this.flow.unsubscribe( );
    }

    /**初始化user、project数据 */
    initData = ( ) => {

        setTimeout(( ) => {
            this.sub = userStore.data.userData$
                .combineLatest(projectStore.data.data$)
                .do( data => {
                    this.user = ls.getItem('user') as APP.User;
                    this.project = data[ 1 ];
                })
                .subscribe( )
        }, 1000 )

    }

    /**权限检查：总负责人或组长 */
    checkAuth = ( ): boolean => {
        
        let { _id } = this.user;
        let { creator, leader } = this.project;

        if ( creator._id === _id ) {
            return true;
        } else if ( leader.find( l => l._id === _id ) ) {
            return true;
        }
        
        console.log('asdasdd')

        Modal.warning({
            title: '消息',
            content: '抱歉。您还没有新增日程的权限',
        });

        return false;
    }

    /**http:获取user */
    fetchUser = ( ) => {
        let pid = this.props.params.id;
        http
            .get< Array<APP.User>, API.Query.AllMemberLeader >('/api/v1/all-member-leader', { pid })
            .map( res => {
                return res.map(({ _id, name, phone }) => ({
                    value: `${_id}`,
                    text: `${name} - phone: ${phone} `
                }))
            })
            .do( res => {
                this.setState({
                    dataSource: res
                })
            })
            .subscribe( )
    }

    /**http获取schedules */
    combineFlow = ( ) => {
        let pid = this.props.params.id;
        let flow =  http
            .get<Schema.Schedule$[], { pid }>('/api/v1/all-schedules', { pid })
            .combineLatest(projectStore.schedule.data$)
            .do( res => {
                
                this.setState({
                    loading: true
                })

                let { scheduleList } = this.state;
                let [ fromFetch, fromSOK ] = res;

                if( !fromSOK ) {

                    // console.log('首次加载')
                    this.setState({
                        scheduleList: fromFetch,
                        loading: false
                    })

                } else {

                    /**fetch的时候是sort: -1 */
                    let lastFromFetch = fromFetch[ 0 ];

                    if ( fromFetch.length === 0 ) {
                        // console.log('首次数据来自于SOK')
                        return this.setState({
                            scheduleList: [ fromSOK, ...scheduleList ],
                            loading: false
                        })
                    }

                    if ( fromSOK._id !== lastFromFetch._id ) {
                        // console.log('更新来自于SOK')
                        this.setState({
                            scheduleList: [ fromSOK, ...fromFetch ],
                            loading: false
                        })
                    } else {
                        // console.log('二次进入')
                        this.setState({
                            scheduleList: fromFetch,
                            loading: false
                        })
                    }


                }


            })
            .subscribe( )        
    }

    /**展示表单 */
    showForm = ( ) => {

        this.setState({ showForm: true });
        this.fetchUser( );


    }

    /**关闭表单 */
    closeForm = ( ) => {
        this.setState({
            showForm: false,
            formTitle: '',
            formPlace: '',
            formStartDate: null,
            formEndDate: null,
            formEndTime: null,
            formStartTime: null,
            formSelect: []
        })
    }

    /**开始日期 */
    changeStartDate = ( date: any, dateString: string ) => {
        
        this.setState({
            formStartDate: moment(new Date(dateString))
        })

    }

    /**结束日期 */
    changeEndDate = ( date: any, dateString: string ) => {
        
        this.setState({
            formEndDate: moment(new Date(dateString))
        })

    }

    /**开始时间 */
    changeStartTime = ( date: any, dateString: string ) => {

        this.setState({
            formStartTime: date
        })

    }

    /**结束时间 */
    changeEndTime = ( date: any, dateString: string ) => {

        this.setState({
            formEndTime: date
        })

    }

    /**选择参与者 */
    selectUser = ( value: Array<string> ) => {
        this.setState({
            formSelect: value
        })
    }

    /**提交表单 */
    submit = ( ) => {

        let { formTitle, formPlace, formStartDate, formEndDate, formStartTime, formEndTime, formSelect } = this.state;

        if ( !this.checkAuth( )) {
            return 
        }

        if ( !(formTitle && formPlace && formStartDate && formEndDate && formStartTime && formEndTime && formSelect.length !== 0 )) {
            return Modal.warning({
                    title: '消息',
                    content: '请填写完整信息',
                });
        }

        http
            .post<API.Res.AddSchedule, API.Query.AddSchedule>('/api/v1/add-schedules', {
                title: formTitle,
                place: formPlace,
                startDate: formStartDate,
                startTime: formStartTime,
                endDate: formEndDate,
                endTime: formEndTime,
                member: formSelect,
                pid: this.props.params.id,
                uid: this.user._id
            })
            .do( res => {
                if ( res.status === '200' ) {
                    this.closeForm( )
                }
            })
            .subscribe( )


    }

    render( ) {

        let { loading ,showForm, dataSource, formTitle, formPlace, formStartDate, formEndDate, formStartTime, formEndTime, formSelect, scheduleList } = this.state;

        /**form */
        let myForm = <div>

            <div className="msg">
                <input placeholder="日程标题" className="my-input title-input" value={ formTitle } onChange={( e:any ) => this.setState({ formTitle: e.target.value })} />
                <input placeholder="地点" className="my-input" value={ formPlace } onChange={( e:any ) => this.setState({ formPlace: e.target.value })} />
            </div>

            <div className="time">
                <Row>
                    <Col span={ 12 }>
                        <h5>开始时间</h5>
                        <DatePicker placeholder="开始日期" value={formStartDate} onChange={this.changeStartDate}  />
                        <TimePicker placeholder="开始时间" value={formStartTime} onChange={this.changeStartTime} />
                    </Col>
                    <Col span={ 12 }>
                        <h5>结束时间</h5>
                        <DatePicker placeholder="结束日期" value={formEndDate} onChange={this.changeEndDate} />
                        <TimePicker placeholder="结束时间" value={formEndTime} onChange={this.changeEndTime}/>
                    </Col>
                </Row>
            </div>

            <div className="member">
                <h5>参与者</h5>
                <Select mode="multiple" 
                    placeholder="请选择日程参与者" 
                    onChange={ this.selectUser }
                    value={ formSelect }
                    style={{ width: 315 }}>
                        {
                            dataSource.map(( data, key ) => {
                                return <Option value={data.value} key={Math.floor(Math.random( )*999)}>{ data.text }</Option>
                            })
                        }
                </Select>
            </div>

            <div style={{ marginTop:15 }}>
                <Button type="primary" style={{ width: '100%' }} onClick={ this.submit }>完成并创建</Button>
            </div>

        </div>

        return <div className="project-schedules-page">
            <div className="container">

                <div className="header" onClick={this.showForm}>
                    <h3><span><Icon type="plus-circle" style={{ fontSize: 16 }} /></span>添加日程</h3>
                </div>

                <div className="content">
                    <Spin spinning={ loading } size='large'>
                    <ul className="list">
                    {
                        scheduleList.map(( s, k ) => <li key={ k }>
                            <h3 className="start-time">{ `${moment( s.startDate ).toDate( ).toLocaleDateString( )} ~ ${moment( s.endDate ).toDate( ).toLocaleDateString( )}` }</h3>
                            <div className="main">

                                <div className="time-block">
                                    <p>{ moment( s.startTime ).toDate( ).toLocaleTimeString( ) }</p>
                                    <p>~</p>
                                    <p>{ moment( s.endTime ).toDate( ).toLocaleTimeString( ) }</p>
                                </div>
                                <h1 className="title">{ s.title }</h1>
                                <h3 className="place"><Icon type="environment" style={{ color: '#49a9ee', marginRight: 5 }}/>{ s.place }</h3>
                                <p style={{ marginTop: 10, marginBottom: 10 }}>参与者</p>
                                <p className="member">
                                    <Tooltip title={ `创建者：${s.creator.name}` }>
                                        <span >
                                            <Image src="/static/touxiang.png" />
                                        </span>
                                    </Tooltip>
                                    {
                                        s.member.map(( m, k ) => <Tooltip title={ m.name } key={ k }>
                                            <span >
                                                <Image src="/static/touxiang.png" />
                                            </span>
                                        </Tooltip>)
                                    }
                                </p>
                            </div>
                        </li>)
                    }
                    </ul>
                    </Spin>
                </div>

            </div>
            <Modal  title="添加日程"  footer={ null } visible={ showForm } className="schedules-form"
                onCancel={ this.closeForm }>
                    { myForm }
            </Modal>
        </div>
    }

}

interface IProps  extends RouteComponentProps<{id: string}, {}>{

}


interface IState {

    loading: boolean
    
    showForm: boolean
    dataSource: Array<{
        value: string,
        text: string
    }>

    /**展示信息 */
    scheduleList: Schema.Schedule$[ ]

    /**表单信息 */
    formTitle: string
    formPlace: string
    formEndDate: any | null
    formStartDate: any | null
    formEndTime: any | null
    formStartTime: any | null
    formSelect: string[ ]

}