import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import {
    GET_PUESTOS_TRABAJO,
    USER_LOGIN,
    USER_INFO,
    LOGOUT,
    GET_TURNOS,
    GET_GRUPOS,
    GET_INTEGRANTES_GRUPOS,
    LOAD_HEADER_REG,
    CLEAR_HEADER_REG,
    IS_LAM,
    GET_REG_PROD_DATA,
    GET_ORDENES,
    GET_REG_PARAD_DATA,
    GET_CARGOS,
    LOAD_FALLA_AREA,
    LOAD_CHATARRA,
    CLEAR_CHATARRA,
    LOAD_MOTIVOCHATERRA,
    LOAD_TIPOCHATARRA,
    LOAD_CHATARRA_POS,
    LOAD_DEMORA,
    CLEAR_DEMORA,
    LOAD_COMP_NUMBER,
    LOAD_REG_COMP_DATA,
    CLEAR_REG_COMP_DATA,
    LOAD_NOTIF,
    LOAD_NOTIF_POS,
    CLEAR_NOTIF,
    SET_ACTIVE_TYPE_NOTIF,
    SET_ACTIVE_NOTIF_HEADER,
    SET_ACTIVE_PTR,
    SET_FECHA_NOTIF
} from "./Actions";

const InitialState = {
  puestosTrabajo: [],
    user: {},
    turnos: null,
    isLam: false,
    grupos: null,
    cargos: null,
    equipos: null,
    integrantesGrp: null,
    isLogin: false,
    userInfo: [],
    headerReg: null,
    regproddata: null,
    regparaddata: null,
    regprodcompdata: null,
    ordenes: null,
    fallaAreas: null,
    chatarraHeader: null,
    chatarraPos: null,
    motivoChatara: null,
    tipoChatarra: null,
    regDemora: null,
    compNumber: null,
    headerNotif: null,
    notifPos: null,
    ActiveTypeNotif: null,
    ActiveNotifId: null,
    ActivePtr: null,
    ActiveFechaN: null,
};

const LocalState = JSON.parse(localStorage.getItem("acero"))

export const GlobalContex = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, LocalState || InitialState);

    useEffect(() => {
        localStorage.setItem("acero", JSON.stringify(state))
    }, [state])

  function getPuestoTrabajo(ptrabajo) {
    dispatch({
      type: GET_PUESTOS_TRABAJO,
      payload: ptrabajo
    });
  }

  function setUserLogin(user) {
    dispatch({
        type: USER_LOGIN,
        payload: user
    })
  }

    function setUserInfo(info) {
        dispatch({
            type: USER_INFO,
            payload: info
        })
    }

    function LogoutUser() {
        localStorage.removeItem("acero")
        dispatch( {
            type: LOGOUT,
            payload: InitialState
        })
    }

    function getTurnos(turnos) {
        dispatch({
            type: GET_TURNOS,
            payload: turnos
        })
    }

    function getGrupos(grupos) {
        dispatch({
            type: GET_GRUPOS,
            payload: grupos
        })
    }

    function getIntegrantesGrupos(lista){
        dispatch({
            type: GET_INTEGRANTES_GRUPOS,
            payload: lista
        })
    }

    function setHeaderRegActive(header) {
        let r = false
        if (header.PuestoTrabajoId === 1 || header.PuestoTrabajoId === 2) {
            r = true
        }
        dispatch({
            type: IS_LAM,
            payload: r
        })

        dispatch({
            type: LOAD_HEADER_REG,
            payload: header
        })
    }

    function clearHeaderRegActive() {
        dispatch({
            type: CLEAR_HEADER_REG,
        })
    }

    function loadRegProdData(regProData) {
        dispatch({
            type: GET_REG_PROD_DATA,
            payload: regProData
        })
    }

    function loadRegPadadData(regparaddata){
      dispatch({
        type: GET_REG_PARAD_DATA,
        payload: regparaddata
      })
    }

    function getOrdenes(ordenes) {
        dispatch({
            type: GET_ORDENES,
            payload: ordenes
        })
    }

    function LoadCargos(cargos){
      dispatch({
        type: GET_CARGOS,
        payload: cargos
      })
    }

    function LoadFallaArea(fallaAreas){
      dispatch({
        type: LOAD_FALLA_AREA,
        payload: fallaAreas
      })
    }

    function LoadChataraHeader(chatarraHeader){
      dispatch({
        type: LOAD_CHATARRA,
        payload: chatarraHeader
      })
    }

    function LoadDemora(demora) {
      dispatch({
        type: LOAD_DEMORA,
        payload: demora
      })
    }

    function ClearDemora() {
      dispatch({
        type: CLEAR_DEMORA
      })
    }

    function ClearChatarra(){
      dispatch({
        type: CLEAR_CHATARRA
      })
    } 

    function ChatarraMotivo(motivo){
      dispatch({
        type: LOAD_MOTIVOCHATERRA,
        payload: motivo
      })
    }

    function ChatarraTipo(tipo){
      dispatch({
        type: LOAD_TIPOCHATARRA,
        payload: tipo
      })
    }

    function SetChatarraPos(chaPos){
      dispatch({
        type: LOAD_CHATARRA_POS,
        payload: chaPos
      })
    }

    function LoadRegCompData(CompData) {
      dispatch({
        type: LOAD_REG_COMP_DATA,
        payload: CompData
      })
    }

    function SetNumComp(Num) {
      dispatch({
        type: LOAD_COMP_NUMBER,
        payload: Num
      })
    }

    function ClearRegComp(){
      dispatch({
        type: CLEAR_REG_COMP_DATA
      })
    }

    function LoadNotif(notif) {
      dispatch({
        type: LOAD_NOTIF,
        payload: notif
      })
    }

    function LoadNotifPos(NotifPos) {
      dispatch({
        type: LOAD_NOTIF_POS,
        payload: NotifPos
      })
    }

    function ClearNotif() {
      dispatch({
        type: CLEAR_NOTIF
      })
    } 

    function SetTypoNotif(notif) {
      dispatch({
        type: SET_ACTIVE_TYPE_NOTIF,
        payload: notif
      })
    }

    function SetActiveNotif(notifId) {
      dispatch({
        type: SET_ACTIVE_NOTIF_HEADER,
        payload: notifId
      })
    }

    function SetActivePtr(ptr) {
      dispatch({
        type: SET_ACTIVE_PTR,
        payload: ptr
      })
    }

    function SetActiveFechaN(fecha) {
      dispatch({
        type: SET_FECHA_NOTIF,
        payload: fecha
      })
    }

  return (
    <GlobalContex.Provider
      value={{
        getPuestoTrabajo,
        getTurnos,
        getGrupos,
        getIntegrantesGrupos,
        setUserLogin,
        setHeaderRegActive,
        setUserInfo,
        LogoutUser,
        clearHeaderRegActive,
        loadRegProdData,
        loadRegPadadData,
        getOrdenes,
        LoadCargos,
        LoadFallaArea,
        LoadChataraHeader,
        ClearChatarra,
        ChatarraMotivo,
        ChatarraTipo,
        SetChatarraPos,
        LoadDemora,
        ClearDemora,
        LoadRegCompData,
        SetNumComp,
        ClearRegComp,
        LoadNotifPos,
        LoadNotif,
        ClearNotif,
        SetTypoNotif,
        SetActiveNotif,
        SetActivePtr,
        SetActiveFechaN,

        userInfo: state.userInfo,
        user: state.user,
        isLogin: state.isLogin,
        turnos: state.turnos,
        grupos: state.grupos,
        integrantesGrp: state.integrantesGrp,
        headerReg: state.headerReg,
        isLam: state.isLam,
        regproddata: state.regproddata,
        regparaddata: state.regparaddata,
        regprodcompdata: state.regprodcompdata,
        ordenes: state.ordenes,
        cargos: state.cargos,
        fallaAreas: state.fallaAreas,
        chatarraHeader: state.chatarraHeader,
        chatarraPos: state.chatarraPos,
        motivoChatara: state.motivoChatara,
        tipoChatarra: state.tipoChatarra,
        regDemora: state.regDemora,
        compNumber: state.compNumber,
        notifPos: state.notifPos,
        headerNotif: state.headerNotif,
        ActiveTypeNotif: state.ActiveTypeNotif,
        ActiveNotifId: state.ActiveNotifId,
        ActivePtr: state.ActivePtr,
        ActiveFechaN: state.ActiveFechaN,
          }}
    >
      {children}
    </GlobalContex.Provider>
  );
};
