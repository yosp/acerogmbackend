﻿import axios from 'axios'

//const base = "http://10.82.33.70:5000/api"
const base = "http://localhost:5000/api"

const LoginUser = (CodigoEmp, Password, callback) => {    
    axios.post(`${base}/agm/loginUser`, {CodigoEmp, Password}
    , {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response)=> {
        callback(null, response.data)
    })
        .catch((error)=>{
            callback(error, null)
        })
}
const UserInfo = (CodigoEmp, callback) => {

    axios.post(`${base}/agm/getUserInfo`, {CodigoEmp}
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(function (response) {
        callback(null, response.data)
    })
        .catch(function (error) {
            callback(error, null)
        }) 
}
const getApiIntegrantesGrp = (callback) => {
    axios.get(`${base}/agm/getGruposIntegrantes`, {
        headers: {
            'Context-Type': 'application/json'
        }
    }).then(function (response) {
        callback(null, response.data)
    }).catch(function (err) {
        callback(err, null)
    })
}
const getApiTurnos = (callback) => {
    axios.get(`${base}/agm/getTurnos`, {
        headers: {
            'Context-Type': 'application/json'
        }
    }).then(function (response) {
        callback(null, response.data)
    }).catch(function (err) {
        callback(err, null)
    })
}
const getApiGrupos = (callback) => {
    axios.get(`${base}/agm/getGrupos`, {
        headers: {
            'Context-Type': 'application/json'
        }
    }).then(function (response) {
        callback(null, response.data)
    }).catch(function (err) {
        callback(err, null)
    })
}

const getCargos = (callback) => {
    axios.get(`${base}/agm/getCargo`, {
        headers: {
            'Context-Type': 'application/json'
        }
    }).then(function (response) {
        callback(null, response.data)
    }).catch(function (err) {
        callback(err, null)
    })
}

const InsertHeaderRegistro = (header, callback) => {

    axios.post(`${base}/registro/insHeaderReg`, {header}
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(function (response) {
        callback(null, response.data[0])
    })
        .catch(function (error) {
            callback(error, null)
        })
}
const getRegProd = (headerid, callback) => {
    axios.get(`${base}/registro/getregproddata?headerid=${headerid}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const getApiOdenenes = (callback) => {
    axios.get(`${base}/ordenes/getOrdenes`,
        {
            headers: {
                    'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        callback(null, response.data)
    }).catch((error) => {
        callback(error, null)
    })
} 
const getOdenenComp = (Orden, callback) => {
    axios.post(`${base}/ordenes/getOrdenesComp`, { Orden }
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(function (response) {
        callback(null, response.data)
    })
        .catch(function (error) {
            callback(error, null)
        })
}
const getOdenenPartida = (comp, callback) => {
    const data = JSON.stringify( { comp })
    axios.get(`${base}/ordenes/getOrdenesPartida`, {data},
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        callback(null, response.data)
    }).catch((error) => {
        callback(error, null)
    })
} 
const insRegProd = (proddat, callback) => {

    axios.post(`${base}/registro/insProdData`, {proddat},
    ).then(function (response) {
        callback(null, response.data)
    })
        .catch(function (error) {
            callback(error, null)
        })
}
const getMotivoFallaArea = (PuestoTr, callback) => {
    axios.get(`${base}/registro/getMotivoFallaArea?PuestoTr=${PuestoTr}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const getMotivoFallaSubArea = (AreaId, callback) => {
    axios.get(`${base}/registro/getMotivoFallaSubArea?AreaId=${AreaId}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const getMotivoFallaLugarAveria = (SubArea, callback) => {
    axios.get(`${base}/registro/getMotivoFallaLugarAveria?SubArea=${SubArea}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const getMotivoFalla = (LugarAveriaId, callback) => {
    axios.get(`${base}/registro/getMotivoFalla?LugarAveriaId=${LugarAveriaId}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const getTipoComb = (callback) => {
    
    axios.get(`${base}/registro/getTipoComb`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const getRegParada = (headerid, callback) => {
    axios.get(`${base}/registro/getParadaData?headerid=${headerid}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const insRegParada = (regParadaD, callback) => {
    axios.post(`${base}/registro/insPosRegParada`, {regParadaD},
    ).then(function (response) {
        callback(null, response.data)
    })
        .catch(function (error) {
            callback(error, null)
        })
}

const insChatarraHeader = (ChatarraHeader, callback) => {
    axios.post(`${base}/Chatarra/InsHeader`, {ChatarraHeader}
    ).then(function (response) {
        callback(null, response.data)
    }).catch(function(err) {
        callback(err, null)
    })
}

const insChatarraPos = (ChatarraPos, callback) => {
    axios.post(`${base}/Chatarra/InsPos`, {ChatarraPos}
    ).then(function (response) {
        callback(null, response.data)
    }).catch(function(err) {
        callback(err, null)
    })
}

const getChatarraPos = (HeaderId, callback) => {
    axios.get(`${base}/Chatarra/getChatarra?HeaderId=${HeaderId}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const GetTipoChatarra = (callback) => {
    axios.get(`${base}/chatarra/gettipo`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const GetMotivoChatarra = (callback) => {
    axios.get(`${base}/chatarra/getmotivo`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const sapSendChatarra = (ZgmAcerogmChatarra, callback) => {
    axios.post('http://appincap01/AgmSapApi/setChatarra', {ZgmAcerogmChatarra})
            .then(function (response) {
                callback(null, response.data)
            }).catch(function(err) {
                callback(err, null)
            })
}

const getDemoras = (demora, callback) => {
    console.log('Esto es el post de demora')
    axios.post(`${base}/demora`, {demora}
    , {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res) {
            callback(null, res.data)
        }).catch(function(err){
            callback(err, null)
        })
} 

export {
    LoginUser,
    UserInfo,
    getCargos,
    getApiIntegrantesGrp,
    getApiTurnos,
    getApiGrupos,
    InsertHeaderRegistro,
    getRegProd,
    getApiOdenenes,
    getOdenenComp,
    getOdenenPartida,
    insRegProd,
    getRegParada,
    insRegParada,
    getMotivoFallaArea,
    getMotivoFallaSubArea,
    getMotivoFallaLugarAveria,
    getMotivoFalla,
    getTipoComb,
    insChatarraHeader,
    insChatarraPos,
    getChatarraPos,
    GetTipoChatarra,
    GetMotivoChatarra,
    sapSendChatarra,
    getDemoras

}
