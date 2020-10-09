import React from 'react'

import NavigationBar from '../Util/NavBar'
import SearchDemora from './SearchDemora'
import DataDemora from './DataDemora'
import LogoutPopup from '../Util/LogoutPopup'
const Demora = () => {
    return (
        <>
          <NavigationBar/>
          <SearchDemora/>
          <DataDemora/>
          <LogoutPopup/>
        </>
    )
}

export default Demora
