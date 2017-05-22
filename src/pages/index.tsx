



import { RouterState } from 'react-router';
import auth from '../services/auth-login.service';



export default {
    path: '/',
    getComponent: ( nextstate: RouterState , cb: Function ) => {
         System.import('./app.page').then( module => { 
             cb( null, module.default )}
         ).catch(( err: Error ) => showMessage( err, './app.page' ))
    },
    childRoutes: [
        {
            path: 'login',
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./login/login.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, './login.page' ))
            },            
        },{
            path: 'projects',
            onEnter: auth.requireLogin,
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./project/project-all.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, './project-all.page' ))
            }           
        },{
            path: 'project/:id',
            onEnter: auth.requireLogin,
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./project/project.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, './project.page' ))
            },
            childRoutes: [
                {
                    path: 'tasks',
                    onEnter: auth.requireLogin,
                    getComponent: ( nextstate: RouterState , cb: Function ) => {
                        System.import('./project/task/project-tasks.page').then( module => { 
                            cb( null, module.default )}
                        ).catch(( err: Error ) => showMessage( err, './project-tasks.page' ))
                    }            
                },
                {
                    path: 'shares',
                    onEnter: auth.requireLogin,
                    getComponent: ( nextstate: RouterState , cb: Function ) => {
                        System.import('./project/share/project-shares.page').then( module => { 
                            cb( null, module.default )}
                        ).catch(( err: Error ) => showMessage( err, './project-shares.page' ))
                    }            
                },
                {
                    path: 'chats',
                    onEnter: auth.requireLogin,
                    getComponent: ( nextstate: RouterState , cb: Function ) => {
                        System.import('./project/chat/project-chat.page').then( module => { 
                            cb( null, module.default )}
                        ).catch(( err: Error ) => showMessage( err, './project-chat.page' ))
                    }            
                },
                {
                    path: 'files',
                    onEnter: auth.requireLogin,
                    getComponent: ( nextstate: RouterState , cb: Function ) => {
                        System.import('./project/file/project-files.page').then( module => { 
                            cb( null, module.default )}
                        ).catch(( err: Error ) => showMessage( err, './project-files.page' ))
                    }            
                },
                {
                    path: 'schedules',
                    onEnter: auth.requireLogin,
                    getComponent: ( nextstate: RouterState , cb: Function ) => {
                        System.import('./project/schedule/project-schedules.page').then( module => { 
                            cb( null, module.default )}
                        ).catch(( err: Error ) => showMessage( err, './project-schedules.page' ))
                    }            
                },
            ]  
        },{
            path: 'msgs',
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./msg/msg-all.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, './msg-all.page' ))
            },
            childRoutes: [
                {
                    path: ':id',
                    getComponent: ( nextstate: RouterState , cb: Function ) => {
                        System.import('./msg/msg-detail.page').then( module => { 
                            cb( null, module.default )}
                        ).catch(( err: Error ) => showMessage( err, './msg-detail.page' ))
                    }              
                }
            ]    
        },{
            path: 'user',
            onEnter: auth.requireLogin,
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./user/user.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, './user.page' ))
            }           
        }
    ]
}

function showMessage( err: Error, pageName: string ): void {
    return console.error(`Error in download ${pageName}: ${err}`)
}

