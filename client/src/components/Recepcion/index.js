import React, { useContext } from 'react'

import NavigationBar from '../Util/NavBar'
import FormHeader from './FormHeader'
import HeaderInfo from './HeaderInfo'
import PosRecepcion from './PosRecepcion'

import { GlobalContex } from '../../context/GlobalState'

const Recepcion = () => {
  const aceroContext = useContext(GlobalContex)
  const { RecepcionHeader } = aceroContext
  
  let children 

  if(RecepcionHeader == null){
    children = <FormHeader/>
  }else {
    children = <>
      <HeaderInfo/>
      <PosRecepcion/>
    </>  
  }

  return (
      <>
          <NavigationBar/>
          {children}
      </>
  )
}

export default Recepcion
