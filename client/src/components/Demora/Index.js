import React from 'react'

import NavigationBar from '../Util/NavBar'
import SearchDemora from './SearchDemora'
import DataDemora from './DataDemora'
const Demora = () => {
    return (
        <>
          <NavigationBar/>
          <SearchDemora/>
          <DataDemora/>
        </>
    )
}

export default Demora
