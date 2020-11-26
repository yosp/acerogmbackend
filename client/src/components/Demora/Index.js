import React, {useContext} from 'react'

import { GlobalContex } from '../../context/GlobalState'
import NavigationBar from '../Util/NavBar'
import SearchDemora from './SearchDemora'
import DataDemora from './DataDemora'
import LogoutPopup from '../Util/LogoutPopup'
import FormDemora from './FormDemora'
const Demora = () => {
  const AceroContext = useContext(GlobalContex)
  const { ActiveDemora } = AceroContext
  let child = <div></div>

  if(ActiveDemora) {
    child = <FormDemora/>
  } else {
    child = <DataDemora/>
  }
    return (
        <div>
          <NavigationBar/>
          <SearchDemora/>
          {child}
          <LogoutPopup/>
        </div>
    )
}

export default Demora
