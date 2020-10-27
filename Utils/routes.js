class Routes {
    constructor(app){
        this.app = app
        this.db = require('./db')
    }

    appRoutes() {
        this.app.get('/api/agm/getturnos', (req, res) => {
            this.db.getTurnos((err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/agm/getCargo', (req, res) => {
            this.db.getCargos((err, data) => {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/agm/equipo', (req, res) => {
            this.db.getEquipos((err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset)
                }
            })
        })
        
        this.app.post('/api/agm/loginUser', (req, res) => {
            this.db.LoginUser(req.body.CodigoEmp, req.body.Password, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset[0])
                }
            })
        })
        
        this.app.post('/api/agm/getUserInfo', (req, res)=> {
            this.db.getUserInfo(req.body.CodigoEmp, (err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/agm/getGrupos', (req, res)=> {
            this.db.getGrupos((err, data)=>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/agm/getGruposIntegrantes', (req, res)=> {
            this.db.getGruposIntegrantes((err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } 
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/registro/insHeaderReg', (req, res)=>{
            this.db.insHeaderRegistro(req.body.header, (err, data)=>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getHeaderReg', (req, res) => {
            this.db.getHeaderRegistro(req.query.HeaderId, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getregproddata', (req, res) => {
            this.db.getregproddata(req.query.headerid, (err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getregprodcompdata', (req, res) => {
            
            this.db.getProdComp(req.query.PosProdId, (err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/registro/insProdData', (req, res) => {
            
            this.db.insProdData(req.body.proddat, (err, data)=> {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/delProdData', (req, res) => {

            this.db.delPosRegProd(req.query.PosRegId, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/registro/insProdCompData', (req, res) => {
            this.db.insProdComp(req.body.procompdat, (err, data)=> {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/registro/delProdCompData', (req, res) => {
            this.db.delProdComp(req.body.PosProdId, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })
        
        this.app.post('/api/registro/updProdData', (req, res) => {
            this.db.updProdData(req.body.RegPosData, (err, data)=>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })

        this.app.get('/api/registro/getParadaData', (req, res) =>{
            this.db.getPosRegParada(req.query.headerid, (err, data)=>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/registro/insPosRegParada', (req, res) => {
            this.db.insPosRegParada(req.body.regParadaD, (err, data) =>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/delParadaData', (req, res) => {
            this.db.delPosRegParada(req.query.ParadaRegId, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })

        this.app.post('/api/registro/updPosRegParada', (req, res) => {
            this.db.updPosRegParada(req.body.paradadata, (err, data) =>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })

        this.app.get('/api/registro/getMotivoFallaArea', (req, res) => {
            this.db.getMotivoFallaArea(req.query.PuestoTr, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getMotivoFallaSubArea', (req, res) => {
            this.db.getMotivoFallaSubArea(req.query.AreaId, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getMotivoFallaLugarAveria', (req, res) => {
            this.db.getMotivoFallaLugarAveria(req.query.SubArea, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getMotivoFalla', (req, res) => {
            this.db.getMotivoFalla(req.query.LugarAveriaId, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else{
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/registro/getTipoComb', (req, res) => {
            this.db.getTipoComb((err,data)=> {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else{
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/ordenes/getOrdenes', (req, res) => {
            this.db.getOrdenes((err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/ordenes/getOrdenesComp', (req, res)=>{
            this.db.getMPrima(req.body.Orden, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else {
                    res.status(200).json(data.recordset)
                }
            })
        } )

        this.app.get('/api/ordenes/getOrdenesList', (req, res) => {
            this.db.getOrdenesProdList({FechaI: req.query.FechaI, FechaF: req.query.FechaF}, (err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/ordenes/getOrdenesCompList', (req, res) => {
            this.db.getOrdenesCompList(req.query.Orden, (err, data)=> {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/sap/ordenes', (req, res)=>{
            this.db.InsSapOrdenes(req.body.ordenesField, (err, data)=> {
            })
            res.status(200).json({'Resp': 'OK'})
        })

        this.app.post('/api/sap/ordenescomp', (req, res)=>{
            this.db.InsSapOrdenesComp(req.body.componentesField, (err, data)=> {
            })
            res.status(200).json({'Resp': 'OK'})
        })

        this.app.get('/api/sap/spordenes', (req, res)=>{
            this.db.SpSapOrdenes()
            res.status(200).json({'Resp': 'OK'})
        })

        this.app.post('/api/Chatarra/InsHeader', (req, res)=>{
            this.db.insChatarraHeader(req.body.ChatarraHeader, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else {
                    res.status(200).json(data.recordset[0])
                }
            })
        })

        this.app.post('/api/Chatarra/RegSap', (req, res)=>{
            this.db.setChatarraRegSap(req.body.Chatarra, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }else {
                    res.status(200).json(data.recordset[0])
                }
            })
        })

        this.app.post('/api/Chatarra/InsPos', (req, res)=>{
            this.db.insChatarraPos(req.body.ChatarraPos, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/chatarra/DelPos', (req, res)=>{
            this.db.delChatarraPos(req.query.PosId, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })
        this.app.get('/api/Chatarra/getChatarra', (req, res)=>{
            this.db.getChatarraPos(req.query.HeaderId, (err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })
        
        this.app.get('/api/chatarra/gettipo', (req, res) => {
            this.db.getChatarraTipo((err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/chatarra/getmotivo', (req, res) => {
            this.db.getChatarraMotivo((err, data)=>{
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/demora', (req, res) => {
            this.db.getDemora(req.body.demora, (err, data)=> {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/regheadernotif', (req, res) => {
            this.db.regHeaderNotif(req.body.header, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset[0])
                }
            })
        })

        this.app.post('/api/regposnotif', (req, res) => {
            this.db.regPosNotif(req.body.posData, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })

        this.app.post('/api/regheadernotifmbfb', (req, res) => {
            this.db.RegHeaderNotifMFBF(req.body.header,(err, data)=>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset[0])
                }
            })
        })

        this.app.post('/api/regposmfbf', (req, res) => {
            this.db.regMfbfPos(req.body.PosData, (err,data)=>{
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data)
                }
            })
        })

        this.app.post('/api/notifHead', (req, res) => {
            this.db.getNotifHeader(req.body.header, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/notifPos', (req, res) => {
            this.db.getNotifPos(req.body.pos, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/mfbf', (req, res) => {
            this.db.getMfbf(req.body.header, (err, data) => {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/mfbfPos', (req, res) => {
            this.db.getMfbfPos(req.body.header, (err, data) => {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })
        // Recepciones
        this.app.post('/api/recepciones/insHeader', (req, res) => {

            this.db.InsertRecepcionHeader(req.body.header, (err, data) => {
                if(err){
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                }
                else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/recepciones/insPosRecepciones', (req, res) => {
            this.db.InsPosRecepcion(req.body.posicion, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.get('/api/recepciones/getPosRecepciones', (req, res) => {

            this.db.GetPosRecepcion(req.query.headerId, (err, data)=> {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })

        this.app.post('/api/recepciones/updPosRecepciones', (req, res) => {
            this.db.UpdPosRecepcion(req.body.posicion, (err, data) => {
                if(err) {
                    res.status(500).json({
                        error: true,
                        message: err
                    })
                } else {
                    res.status(200).json(data.recordset)
                }
            })
        })
    }
    routesConfig() {
        this.appRoutes()
    }
}

module.exports = Routes;