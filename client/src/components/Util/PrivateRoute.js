import React, { useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalContex } from '../../context/GlobalState'



const PrivateRoute = ({ component: Component, ...rest }) => {
    const AceroContex = useContext(GlobalContex)
    const { isLogin } = AceroContex
 
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
        )
}

export default PrivateRoute