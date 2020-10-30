import React, { useContext, useEffect } from 'react'

import NavigationBar from '../Util/NavBar'
import FormHeader from './FormHeader'
import HeaderInfo from './HeaderInfo'
import PosRecepcion from './PosRecepcion'
import PosRecepcionTransView from './PosRecepcionTrans'

import { GlobalContex } from '../../context/GlobalState'

const Recepcion = () => {
  const aceroContext = useContext(GlobalContex)
  const { RecepcionHeader, PosRecepcionTrans, resetReception  } = aceroContext

  let children 

  if(RecepcionHeader == null){
    children = <FormHeader/>
  }
  else if(PosRecepcionTrans == null) {
    children = <>
      <HeaderInfo/>
      <PosRecepcion/>
    </>  
  }
  else {
    children = <>
      <HeaderInfo/>
      <PosRecepcionTransView/>
    </>
  }

  useEffect(()=>{
    console.log("Recepcion init")
    return function clean() {
      console.log("Bye Bye")
      resetReception()
    }
  }, [])

  return (
      <>
          <NavigationBar/>
          {children}
      </>
  )
}

export default Recepcion
