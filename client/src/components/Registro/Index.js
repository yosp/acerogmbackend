import React, { useContext } from 'react'
import { GlobalContex } from '../../context/GlobalState'

import NavigationBar from '../Util/NavBar'
import PuestoTr from "./PuestoTr"
import HeaderReg from './HeaderReg'
import DataPanel from './DataPanel'
import CompData from './DataCompPanel'

const Registro = () => {
    const aceroContext = useContext(GlobalContex)
    const { headerReg, regprodcompdata } = aceroContext
    let children
    let subChildren

    if(regprodcompdata == null) {
        subChildren = <></>
    } else {
        subChildren = <CompData/>
    }


    if (headerReg == null) {
        children = <PuestoTr />
    } else {
        children = <div>
            <HeaderReg header={headerReg}  />
            <DataPanel/>
        </div>
    }

    return (
        <>
            <NavigationBar />
            {children}
            {subChildren}
        </>
    )
}

export default Registro
