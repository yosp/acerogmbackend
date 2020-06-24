import {
    GET_PUESTOS_TRABAJO,
    USER_INFO,
    USER_LOGIN,
    LOGOUT,
    GET_TURNOS,
    GET_GRUPOS,
    GET_INTEGRANTES_GRUPOS,
    LOAD_HEADER_REG,
    GET_REG_PARAD_DATA,
    CLEAR_HEADER_REG,
    IS_LAM,
    GET_REG_PROD_DATA,
    GET_ORDENES,
    GET_CARGOS,
    LOAD_FALLA_AREA,
    LOAD_CHATARRA,
    CLEAR_CHATARRA,
    LOAD_TIPOCHATARRA,
    LOAD_MOTIVOCHATERRA,
    LOAD_CHATARRA_POS,
    LOAD_DEMORA,
    CLEAR_DEMORA,
    LOAD_REG_COMP_DATA,
    LOAD_COMP_NUMBER,
    CLEAR_REG_COMP_DATA
    
} from './Actions'

export default (state, action) => {
    switch (action.type) {
        case GET_PUESTOS_TRABAJO:
            return {
                ...state,
                puestosTrabajo: [action.payload, ...state.puestosTrabajo]
            }
        case USER_LOGIN:
            return {
                ...state,
                user: action.payload,
                isLogin: true
            }
        case USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case LOGOUT: 
            return {
                state: action.payload
            }
        
        case GET_TURNOS: 
            return {
                ...state,
                turnos: action.payload
                }
        case GET_GRUPOS:
            return {
                ...state,
                grupos: action.payload
            }
        case GET_INTEGRANTES_GRUPOS:
            return {
                ...state,
                integrantesGrp: action.payload
            }
        case IS_LAM:
            return {
                ...state,
                isLam: action.payload
            }
        case LOAD_HEADER_REG:
            return {
                ...state,
                headerReg: action.payload
            }
        case CLEAR_HEADER_REG:
            return {
                ...state,
                headerReg: null,
                regproddata: null,
                regparaddata: null,
            }
        case GET_REG_PROD_DATA:
            return {
                ...state,
                regproddata: action.payload
            }
        case GET_ORDENES:
            return {
                ...state,
                ordenes: action.payload
            }
        case GET_CARGOS:
            return {
                ...state,
                cargos: action.payload
            }
        case LOAD_FALLA_AREA:
            return {
                ...state,
                fallaAreas: action.payload
            }
        case GET_REG_PARAD_DATA:
            return {
                ...state,
                regparaddata: action.payload
            }
        case LOAD_CHATARRA:
            return {
                ...state,
                chatarraHeader: action.payload
            }
        case CLEAR_CHATARRA:
            return {
                ...state,
                chatarraHeader: null,
                chatarraPos: null
            }
        case LOAD_TIPOCHATARRA: 
            return {
                ...state,
                tipoChatarra: action.payload
            }
        case LOAD_MOTIVOCHATERRA: 
            return {
                ...state,
                motivoChatara: action.payload
            }
        case LOAD_CHATARRA_POS:
            return {
                ...state,
                chatarraPos: action.payload
            }
        case LOAD_DEMORA:
            return {
                ...state,
                regDemora: action.payload
            }
        case CLEAR_DEMORA:
            return {
                ...state,
                regDemora: null
            }
        case LOAD_COMP_NUMBER:
            return {
                ...state,
                compNumber: action.payload
            }
        case LOAD_REG_COMP_DATA:
            return {
                ...state,
                regprodcompdata: action.payload
            }
        case CLEAR_REG_COMP_DATA:
            return {
                ...state,
                regprodcompdata: null
            }
        default:
            return state
    }
}