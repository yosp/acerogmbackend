import React, { useContext } from 'react'

import NavigationBar from '../Util/NavBar'
import HeaderSearch from './HeadSearch'
import HeaderTable from './HeaderTable'
import HeaderTableMfbf from './HeaderTableMfbf'
import PosTable from './PosTable'
import { GlobalContex } from '../../context/GlobalState'

const Index = () => {
    const AceroContext = useContext(GlobalContex)
    const { ActiveTypeNotif } = AceroContext
    let table = <></>
    if(ActiveTypeNotif == 1) {
      table = <HeaderTable/>
    } else {
      table = <HeaderTableMfbf/>
    }
    return (
        <>
          <NavigationBar/>
          <HeaderSearch/>  
          {table}
          <PosTable/>
        </>
    )
}

export default Index
