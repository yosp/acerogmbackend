import React from 'react'

import NavigationBar from '../Util/NavBar'
import HeaderSearch from './HeadSearch'
import HeaderTable from './HeaderTable'
import PosTable from './PosTable'

const Index = () => {
    return (
        <>
          <NavigationBar/>
          <HeaderSearch/>  
          <HeaderTable/>
          <PosTable/>
        </>
    )
}

export default Index
