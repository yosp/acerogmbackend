import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import {
    GET_PUESTOS_TRABAJO,
    USER_LOGIN,
    USER_INFO,
    LOGOUT,
    GET_TURNOS,
    GET_GRUPOS,
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
    SET_FECHA_NOTIF,
    SET_ORDENCOMP,
    SET_EDIT_REGPROD,
    SET_EDIT_REGPARADA,
    SET_CHATARRA_HEADER_ID,
    SET_ORDEN_LIST,
    SET_ORDEN_COMP_LIST,
    SET_LOADING,
    SET_HEADER_RECEPTION,
    RESET_RECEPTION,
    GET_GRUPO_RECEP,
    GET_SUPPLY,
    SET_POS_RECEPCION,
    SET_EDIT_POS_RECEPCION,
    SET_POS_RECEPCION_TRANS,
    RESET_REGISTRO_PROD,
    USER_ROLES,
    USER_SEARCH_SAP,
    USER_SEARCH,
    USER_ROL_LIST,
    TOGGLE_PERFIL,
    TOGGLE_ROL,
    SET_ACTIVE_ROL,
    ACTIVE_CONF_USER,
    NOT_USER_ROL_LIST,
    TOGGLE_SAP_PASS,
    TOGGLE_PUESTO_TR,
    GRUPO_PTR_ID,
    TOGGLE_GRUPO,
    TOGGLE_ADD_GRUPO,
    TOGGLE_ADD_MEMBER,
    ACTIVE_GRUPO_ID,
    TOGGLE_MEMBER_LIST,
    TOGGLE_DEMORA,
    ACTIVE_DEMORA,
    TOGGLE_NOTIF_MFBF_TEXT,
    ACTIVE_NOTIF_MFBF_ID,
    GET_ORDEN_PTR,
} from "./Actions";

const InitialState = {
  puestosTrabajo: [],
    user: {},
    userRol: null,
    turnos: null,
    isLam: false,
    grupos: null,
    cargos: null,
    equipos: null,
    isLogin: false,
    userInfo: [],
    headerReg: null,
    regproddata: null,
    activeproddata: null,
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
    OrdenComp: null,
    ActiveParadaData: null,
    ChatarraHeaderId: null,
    OrdenList: null,
    OrdenCompList: null,
    Loading: false,
    RecepcionHeader: null,
    PosRecepcion: null,
    PosRecepcionTrans: null,
    Suplidores: null,
    GrupoRecepcion: null,
    ActivePosReception: null,
    UserSearch: null,
    UserSearchSap: null,
    UserRolList: null,
    NotUserRolList: null,
    TogglePerfil: false,
    ToggleRol: false,
    ActiveRol: null,
    ActiveConfUser: null,
    ToggleSapPass: false,
    TogglePuestoTr: false,
    PtrGrupo: [],
    GrupoPtrId: null,
    ToggleGrupo: false,
    ToggleAddGrupo: false,
    ToggleAddMember: false,
    ActiveGrupoId: null,
    ToggleMemberList: false,
    ToggleDemora : false,
    ActiveDemora: null,
    ToggleNotifMfbfText: false,
    NotifMfbfId: null,
    OrdenPtr: []
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

    function SetLoginRol(rol) {
      dispatch({
        type: USER_ROLES,
        payload: rol
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

    function SetEditProdData(proddata){
      dispatch({
        type: SET_EDIT_REGPROD,
        payload: proddata
      })
    }

    function SetOrdenComp(OrdenId) {
      dispatch({
        type: SET_ORDENCOMP,
        payload: OrdenId
      })
    }

    function SetEditParadData(paraddata){
      dispatch({
        type: SET_EDIT_REGPARADA,
        payload: paraddata
      })
    }

    function SetChatarraHeaderId(HeaderId){
      dispatch({
        type: SET_CHATARRA_HEADER_ID,
        payload: HeaderId
      })
    }

    function setOrdenList(OrdenList) {
      dispatch({
        type: SET_ORDEN_LIST,
        payload: OrdenList
      })
    }

    function setOrdenCompList(OrdenCompList) {
      dispatch({
        type: SET_ORDEN_COMP_LIST,
        payload: OrdenCompList
      })
    }

    function setLoading(Load) {
      dispatch({
        type: SET_LOADING,
        payload: Load
      })
    }

    function setReceptionHeader(recHeader){
      dispatch({
        type: SET_HEADER_RECEPTION,
        payload: recHeader
      })
    }

    function resetReception(){
      dispatch({
        type: RESET_RECEPTION
      })
    }

    function setSuplidores(sups){
      dispatch({
        type: GET_SUPPLY,
        payload: sups
      })
    }

    function setGrupoRecep(GRecep){
      dispatch({
        type: GET_GRUPO_RECEP,
        payload: GRecep
      })
    }

    function setPosRecepcion(position) {
      dispatch({
        type: SET_POS_RECEPCION,
        payload: position
      })
    }

    function setActivePosReception(Id) {
      dispatch({
        type: SET_EDIT_POS_RECEPCION,
        payload: Id
      })
    }

    function setPosRecTrans(transData) {
      dispatch({
        type: SET_POS_RECEPCION_TRANS,
        payload: transData
      })
    }

    function resetRegProd() {
      dispatch({
        type: RESET_REGISTRO_PROD
      })
    }

    function setUserSearch(user) {
      dispatch({
        type: USER_SEARCH,
        payload: user
      })
    }

    function setUserSearchSap(user) {
      dispatch({
        type: USER_SEARCH_SAP,
        payload: user
      })
    }

    function setUserRolList(rolList) {
      dispatch({
        type: USER_ROL_LIST,
        payload: rolList
      })
    }

    function setTogglePerfil(toggle) {
      dispatch({
        type: TOGGLE_PERFIL,
        payload: toggle
      })
    }

    function setToggleRol(toggle) {
      dispatch({
        type: TOGGLE_ROL,
        payload: toggle
      })
    }

    function setActiveRol(rolid) {
      dispatch({
        type: SET_ACTIVE_ROL,
        payload: rolid
      })
    }

    function setActiveUserConf(codUser) {
      dispatch({
        type: ACTIVE_CONF_USER,
        payload: codUser
      })
    }

    function setNotUserRolList(RolList) {
      dispatch({
        type: NOT_USER_ROL_LIST,
        payload: RolList
      })
    }

    function setToggleSapPass(toggle) {
      dispatch({
        type: TOGGLE_SAP_PASS,
        payload: toggle
      })
    }

    function setTogglePtr(toggle){
      dispatch({
        type: TOGGLE_PUESTO_TR,
        payload: toggle
      })
    }

    function setGrupoPtrId(Ptr) {
      dispatch({
        type: GRUPO_PTR_ID,
        payload: Ptr
      })
    }

    function setToogleGrupo(grupo){
      dispatch({
        type: TOGGLE_GRUPO,
        payload: grupo
      })
    }

    function setToggleAddGrupo(grupo) {
      dispatch({
        type: TOGGLE_ADD_GRUPO,
        payload: grupo
      })
    }

    function setToggleAddMember(member) {
      dispatch({
        type: TOGGLE_ADD_MEMBER,
        payload: member
      })
    }

    function setActiveGrupoId(grupoId) {
      dispatch({
        type: ACTIVE_GRUPO_ID,
        payload: grupoId
      })
    }

    function setToggleMemberList(toggle) {
      dispatch({
        type: TOGGLE_MEMBER_LIST,
        payload: toggle
      })
    }

    function setToggleDemora(toggle) {
      dispatch({
        type: TOGGLE_DEMORA,
        payload: toggle
      })
    }

    function setActiveDemora(demoraId) {
      dispatch({
        type: ACTIVE_DEMORA,
        payload: demoraId
      })
    }

    function setToggleNotifMfbfText(toggle) {
      dispatch({
        type: TOGGLE_NOTIF_MFBF_TEXT,
        payload: toggle
      })
    }

    function setActiveNotifMbffId(id) {
      dispatch({
        type:ACTIVE_NOTIF_MFBF_ID,
        payload: id
      })
    }

    function setOrdenPtr(orden) {
      dispatch({
        type: GET_ORDEN_PTR,
        payload: orden
      })
    }

  return (
    <GlobalContex.Provider
      value={{
        getPuestoTrabajo,
        setTogglePerfil,
        setToggleRol,
        setUserRolList,
        setNotUserRolList,
        getTurnos,
        getGrupos,
        setUserLogin,
        setHeaderRegActive,
        setUserInfo,
        LogoutUser,
        SetLoginRol,
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
        SetOrdenComp,
        SetEditProdData,
        SetEditParadData,
        SetChatarraHeaderId,
        setOrdenList,
        setOrdenCompList,
        setLoading,
        setReceptionHeader,
        resetReception,
        setGrupoRecep,
        setSuplidores,
        setPosRecepcion,
        setActivePosReception,
        setPosRecTrans,
        resetRegProd,
        setUserSearch,
        setUserSearchSap,
        setActiveRol,
        setActiveUserConf,
        setToggleSapPass,
        setTogglePtr,
        setGrupoPtrId,
        setToogleGrupo,
        setToggleAddGrupo,
        setToggleAddMember,
        setActiveGrupoId,
        setToggleMemberList,
        setToggleDemora,
        setActiveDemora,
        setToggleNotifMfbfText,
        setActiveNotifMbffId,
        setOrdenPtr,

        userInfo: state.userInfo,
        user: state.user,
        userRol: state.userRol,
        isLogin: state.isLogin,
        turnos: state.turnos,
        grupos: state.grupos,
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
        OrdenComp: state.OrdenComp,
        activeproddata: state.activeproddata,
        ActiveParadaData: state.ActiveParadaData,
        ChatarraHeaderId: state.ChatarraHeaderId,
        OrdenList: state.OrdenList,
        OrdenCompList: state.OrdenCompList,
        Loading: state.Loading,
        RecepcionHeader: state.RecepcionHeader,
        Suplidores: state.Suplidores,
        GrupoRecepcion: state.GrupoRecepcion,
        PosRecepcion: state.PosRecepcion,
        ActivePosReception: state.ActivePosReception,
        PosRecepcionTrans: state.PosRecepcionTrans,
        UserSearch: state.UserSearch,
        UserSearchSap: state.UserSearchSap,
        UserRolList: state.UserRolList,
        TogglePerfil: state.TogglePerfil,
        ToggleRol: state.ToggleRol,
        ActiveRol: state.ActiveRol,
        ActiveConfUser: state.ActiveConfUser,
        NotUserRolList: state.NotUserRolList,
        ToggleSapPass: state.ToggleSapPass,
        TogglePuestoTr: state.TogglePuestoTr,
        GrupoPtrId: state.GrupoPtrId,
        ToggleGrupo: state.ToggleGrupo,
        ToggleAddGrupo: state.ToggleAddGrupo,
        ToggleAddMember: state.ToggleAddMember,
        ActiveGrupoId: state.ActiveGrupoId,
        ToggleMemberList: state.ToggleMemberList,
        ToggleDemora: state.ToggleDemora,
        ActiveDemora: state.ActiveDemora,
        ToggleNotifMfbfText: state.ToggleNotifMfbfText,
        NotifMfbfId: state.NotifMfbfId,
        OrdenPtr: state.OrdenPtr
          }}
    >
      {children}
    </GlobalContex.Provider>
  );
};
