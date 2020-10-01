import React, { useContext, useEffect } from 'react'

import NavigationBar from '../Util/NavBar'
import HeaderSearch from './HeadSearch'
import HeaderTable from './HeaderTable'
import HeaderTableMfbf from './HeaderTableMfbf'
import PosTable from './PosTable'
import { GlobalContex } from '../../context/GlobalState'

const Index = () => {
    const AceroContext = useContext(GlobalContex)
    const { ActiveTypeNotif, SetActiveNotif, LoadNotif, LoadNotifPos } = AceroContext
    let table = <></>

    useEffect(()=>{
      
      return function cleanup() {
        SetActiveNotif(null)
        LoadNotif(null)
        LoadNotifPos(null)
      };
    },[])

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
