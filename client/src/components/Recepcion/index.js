import React from 'react'

import NavigationBar from '../Util/NavBar'
import FormHeader from './FormHeader'
import HeaderInfo from './HeaderInfo'
import PosRecepcion from './PosRecepcion'

const index = () => {
    return (
        <>
            <NavigationBar/>
            <FormHeader/>
            <HeaderInfo/>
            <PosRecepcion/>
        </>
    )
}

export default index
