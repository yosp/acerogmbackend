import axios from 'axios'

//const base = "http://10.82.33.72:5000/api" // Quality Server
//const base = "http://10.82.33.70:5000/api" // production Server
const base = "http://localhost:5000/api" // Development server

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

const getHeaderReg = (HeaderId, callback) => {

    axios.get(`${base}/registro/getHeaderReg?HeaderId=${HeaderId}`
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

const delPosRegProd = (PosRegId, callback) => {
    axios.get(`${base}/registro/delProdData?PosRegId=${PosRegId}`
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

const updPosRegProd = (RegPosData, callback) => {
    console.log(base)
    axios.post(`${base}/registro/updProdData`, {RegPosData}
    ,  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
).then(function (response) {
    callback(null, response.data)
}
).catch(function (error) {
    callback(error, null)
})
}
const getRegProd = (headerid, callback) => {
    axios.get(`${base}/registro/getregproddata?headerid=${headerid}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const getApiRegProdComp = (PosProdId, callback) => {
    axios.get(`${base}/registro/getregprodcompdata?PosProdId=${PosProdId}`)
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}
const InsertProdComp = (procompdat, callback) => {
    
    axios.post(`${base}/registro/insProdCompData`, {procompdat}
                ,  {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function (response) {
                callback(null, response.data)
            }
            ).catch(function (error) {
                callback(error, null)
            })
}
const DelProdComp = (PosProdId, callback) => {
    axios.post(`${base}/registro/delProdCompData`, {PosProdId}
    ,  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
).then(function (response) {
    callback(null, response.data)
}
).catch(function (error) {
    callback(error, null)
})
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
const updParadaReg = (paradadata, callback) => {
    axios.post(`${base}/registro/updPosRegParada`, {paradadata}
    ,  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
).then(function (response) {
    callback(null, response.data)
}
).catch(function (error) {
    callback(error, null)
})
}

const delParadaRegProd = (ParadaRegId, callback) => {
    axios.get(`${base}/registro/delParadaData?ParadaRegId=${ParadaRegId}`
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

const setChatarraRegSap = (Chatarra, callback) => {
    axios.post(`${base}/Chatarra/RegSap`, {Chatarra}
    ).then(function (response) {
        callback(null, response.data)
    }).catch(function(err) {
        callback(err, null)
    })
}
const delChatarraPos = (PosId, callback) => {
    axios.get(`${base}/chatarra/DelPos?PosId=${PosId}`
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
    fetch('http://appincap01/AgmSapApi/api/setChatarra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(ZgmAcerogmChatarra)
        })
        .then(response => response.json())
            .then(data => {
                callback(null, data)
            })
        .catch(function(err) {
            callback(err, null)
        })
}

const regHeaderNotif = (header, callback) => {
    axios.post(`${base}/regheadernotif`, {header}
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

const regPosNotif = (posData, callback) => {
    axios.post(`${base}/regposnotif`, {posData}
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
const getDemoras = (demora, callback) => {
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

const getNotif = (header, callback) => {
    axios.post(`${base}/notifHead`, {header}
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

const getNotifPos = (pos, callback) => {
    axios.post(`${base}/notifPos`, {pos}
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

const sapSendCo11 = (Co11, callback) => {
    fetch('http://appincap01/AgmSapApi/api/setNotif', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Co11)
        })
        .then(response => response.json())
            .then(data => {
                callback(null, data)
            })
        .catch(function(err) {
            callback(err, null)
        })
}

const sapSendMfbf = (mfbf, callback) => {
    fetch('http://appincap01/AgmSapApi/api/setMfbf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(mfbf)
        })
        .then(response => response.json())
            .then(data => {
                callback(null, data)
            })
        .catch(function(err) {
            callback(err, null)
        })
}

const getmfbf = (header, callback) => {
    axios.post(`${base}/mfbf`, {header}
    , {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res) {
            callback(null, res.data)
        }).catch(function(err){
            debugger
            callback(err, null)
        })
}

const getmfbfPos = (header, callback) => {
    axios.post(`${base}/mfbfPos`, {header}
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
const regHeaderNotifMfbf = (header, callback) => {
    axios.post(`${base}/regheadernotifmbfb`, {header}
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
const regPosNotifMfbf = (PosData, callback) => {
    debugger
    axios.post(`${base}/regposmfbf`, {PosData}
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

const getOrdenList = (OrdenFiltro, callback) => {
    axios.get(`${base}/ordenes/getOrdenesList?FechaI=${OrdenFiltro.FechaI}&FechaF=${OrdenFiltro.FechaF}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const getOrdenCompList = (Orden, callback) => {
    axios.get(`${base}/ordenes/getOrdenesCompList?Orden=${Orden}`
    )
    .then(response => { callback(null, response.data)})
    .catch(err => console.warn(err));
}

const insRecepHeader = (header, callback) => {
    axios.post(`${base}/recepciones/insHeader`, {header}
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            callback(null, res.data[0])
        }).catch(function(err){
            callback(err, null)
        })
}

const getEntradaGrupo = (callback) => {
    axios.get(`${base}/recepciones/EntradaGrupos`,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        callback(null, res.data)
    }).catch(function(err){
        callback(err, null)
    })
}
const getMateriales = (Material,callback) => {
    axios.get(`${base}/GetMateriales?Material=${Material}`,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        callback(null, res.data)
    }).catch(function(err){
        callback(err, null)
    })
}

const getSuplidores = (GrupoId, callback) => {
    axios.get(`${base}/GetSuplidores?GrupoId=${GrupoId}`,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        callback(null, res.data)
    }).catch(function(err){
        callback(err, null)
    })
}

const InsPosRecepcion = (posicion, callback) => {
    axios.post(`${base}/recepciones/insPosRecepciones`, {posicion}
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            callback(null, res.data)
        }).catch(function(err){
            callback(err, null)
        })
}

const UpdPosRecepcion = (posicion, callback) => {
    axios.post(`${base}/recepciones/updPosRecepciones`, {posicion}
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            callback(null, res.data)
        }).catch(function(err){
            callback(err, null)
        })
}


const GetPosRecepcion = (headerId, callback) => {
    axios.get(`${base}/recepciones/getPosRecepciones?headerId=${headerId}`
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            callback(null, res.data)
        }).catch(function(err){
            callback(err, null)
        })
}

const DelPosRecepcion = (PosId, callback) => {
    axios.get(`${base}/recepciones/DelPosRecepciones?PosId=${PosId}`
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            callback(null, res.data)
        }).catch(function(err){
            callback(err, null)
        })
}

const GetLoteByMaterial = (Material, callback) => {
    axios.get(`${base}/registro/getLote?Material=${Material}`
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            callback(null, res.data)
        }).catch(function(err){
            callback(err, null)
        })
}

const GetPosRecTrans = (TransId, callback) => {
    axios.get(`${base}/recepciones/getPosRecTrans?TransId=${TransId}`
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
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
    getHeaderReg,
    getRegProd,
    getApiOdenenes,
    getOdenenComp,
    getOdenenPartida,
    insRegProd,
    getRegParada,
    updPosRegProd,
    insRegParada,
    getMotivoFallaArea,
    getMotivoFallaSubArea,
    getMotivoFallaLugarAveria,
    getMotivoFalla,
    getTipoComb,
    insChatarraHeader,
    insChatarraPos,
    getChatarraPos,
    delChatarraPos,
    GetTipoChatarra,
    GetMotivoChatarra,
    sapSendChatarra,
    sapSendMfbf,
    getDemoras,
    getNotif,
    getNotifPos,
    getApiRegProdComp,
    InsertProdComp,
    DelProdComp,
    getmfbf,
    getmfbfPos,
    regHeaderNotif,
    regPosNotif,
    sapSendCo11,
    regHeaderNotifMfbf,
    regPosNotifMfbf,
    delPosRegProd,
    delParadaRegProd,
    updParadaReg,
    getOrdenList,
    getOrdenCompList,
    setChatarraRegSap,
    insRecepHeader,
    getEntradaGrupo,
    getMateriales,
    getSuplidores,
    InsPosRecepcion,
    GetPosRecepcion,
    DelPosRecepcion,
    UpdPosRecepcion,
    GetLoteByMaterial,
    GetPosRecTrans
}
