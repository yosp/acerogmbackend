import React, { useContext, useEffect } from 'react'
import ChatarraHead from './ChatarraHead'
import ChatarraPos from './ChatarraPos'
import HeaderPanel from './HeaderPanel'
import NavigationBar from '../Util/NavBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from '../../context/GlobalState'
import { GetMotivoChatarra, GetTipoChatarra } from '../../context/Api'


const Chatarra = () => {
    const aceroContext = useContext(GlobalContex)
    const { chatarraHeader, motivoChatara, tipoChatarra, ChatarraMotivo, ChatarraTipo } = aceroContext

    let children 

    useEffect(() => {
        if(tipoChatarra === null) {
            GetTipoChatarra((err,data) => {
                if(err){
                    toast.error("Error al cargar tipo de chatarra", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 3000
                    });
                }
                else {
                    ChatarraTipo(data)
                }
                
            })
        }

        if(motivoChatara === null) {
            GetMotivoChatarra((err, data) => {
                if(err) {
                    toast.error("Error al cargar el motivo de chatarra", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 3000
                    });
                }else {
                    if(data == undefined || data == null) {
                        ChatarraMotivo([])    
                    } else {
                        ChatarraMotivo(data)
                    }
                    
                }
            })
        }
    },[])
    
    if(chatarraHeader == null){
        children = <ChatarraHead/>
    } else {
        children = <div>
                <HeaderPanel/>
                <ChatarraPos/>
                
            </div>
    }

    return (
        <div>
            <NavigationBar/>
            {children}
            <ToastContainer />
        </div>
    )
}

export default Chatarra
