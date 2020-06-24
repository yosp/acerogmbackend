import React, { useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalContex } from '../../context/GlobalState'



const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const AceroContex = useContext(GlobalContex)
    const { isLogin } = AceroContex

    return (
        <Route {...rest} render={props => (
            isLogin && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
        )
}

    export default PublicRoute