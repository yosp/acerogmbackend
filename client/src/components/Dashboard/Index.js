import React, { useContext, useEffect } from 'react'

import { GlobalContex } from '../../context/GlobalState'
import { getApiTurnos, getApiGrupos, getApiIntegrantesGrp, getApiOdenenes, getCargos, getMotivoFallaArea } from '../../context/Api'
import NavigationBar from '../Util/NavBar'
import LogoutPopup from '../Util/LogoutPopup'


const Dashboard = () => {
    const AceroContext = useContext(GlobalContex)
    const { getTurnos
        , getGrupos
        , getIntegrantesGrupos
        , turnos
        , grupos
     //   , cargos
        , integrantesGrp
        , ordenes
        , getOrdenes
      //  , LoadCargos
        
    } = AceroContext

    useEffect(() => {
        
        if (turnos === null || turnos === undefined) {
            getApiTurnos((err, data) => {
                if (err) {

                } else {
                    getTurnos(data)
                }
            })
        }

        // if(cargos === null || turnos === undefined) {
        //     getCargos((err, data) => {
        //         if(err) {

        //         } else {
        //             LoadCargos(data)
        //         }
        //     })
        // }

        if (ordenes === null || ordenes === undefined) {
            getApiOdenenes((err, data) => {
                if (err) {

                }
                else {
                    getOrdenes(data)
                }
            })
        }

        if (grupos === null || grupos === undefined) {
            getApiGrupos((err, grupos) => {
                if (err) {

                } else {
                    getGrupos(grupos)
                }
            })
            if (integrantesGrp === null || integrantesGrp === undefined) {
                getApiIntegrantesGrp((err, lista) => {
                    if (err) {

                    } else {
                        getIntegrantesGrupos(lista)
                    }
                })
            }
        }
    },[])

    return (
        <>
            <NavigationBar/>
            Dashboard
            <LogoutPopup/>
        </>
    )
}

export default Dashboard
