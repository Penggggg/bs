
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
                System.import('./login.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, './login.page' ))
            },            
        }
    ]
}

function showMessage( err: Error, pageName: string ): void {
    return console.error(`Error in download ${pageName}: ${err}`)
}
