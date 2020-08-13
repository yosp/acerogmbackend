const sql = require("mssql");

class Db {
  constructor() {
    this.config = {
      user: process.env.SQLUSER || "AceroGmUser",
      password: process.env.SQLPAS || "AceroGmUser",
      server: process.env.SQLSRV || "10.82.33.71",
      port: 1433,
      options: {
        instanceName: process.env.SQLINT || "MSSQLSERVER",
        database: process.env.SQLDB || "DB_AceroGm",
        enableArithAbort: true,
      },
    };
    this.setting = `mssql://${this.config.user}:${this.config.password}@${this.config.server}/${this.config.options.database}`;
  }

  async getTurnos(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * from strListaTurnos`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getGrupos(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select distinct
                                                lg.Id
                                                ,gp.Id as GrupoId
                                                ,lg.Descripcion as grupo
                                                ,u.CodigoEmp
                                                ,lu.Nombres
                                                ,gp.PuestoTrId
                                                ,pt.Descripcion as puestoTr
                                                from strListaGrupos lg
                                                    inner join StrGrupo gp on gp.GrupoId = lg.Id
                                                    inner join StrUsuario u on gp.CodigoEmp = u.CodigoEmp
                                                    inner join loginUsuarios lu on lu.CodigoEmp = gp.CodigoEmp
                                                    inner join strPuestosTrabajos pt on pt.id = gp.PuestoTrId`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async LoginUser(CodigoEmp, Password, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select CodigoEmp, Nombres, Estatus 
                                                from loginUsuarios
                                                    where CodigoEmp=${CodigoEmp} and Password=${Password} and Estatus='A'`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getUserInfo(codigoEmp, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select distinct
            u.Id
            ,u.CodigoEmp
            ,l.Nombres
            ,r.Id as RolId
            ,r.Titulo as Rol
            ,u.StrCiaId
            ,cia.Titulo as cia
            ,s.Id as subAreaId
            ,s.Titulo as SubArea
            ,u.PuestoTrId
            ,ptr.Descripcion as PuestoTr
            ,ptr.TipoNotif
            from StrUsuario u 
                    inner join loginUsuarios l on l.CodigoEmp = u.CodigoEmp
                    inner join loginRoles r on r.Id = u.RolId
                    inner join strCia cia on cia.Id = u.StrCiaId
                    inner join strPuestosTrabajos ptr on u.PuestoTrId = ptr.Id
                    inner join strCiaSubAreas s on s.id = ptr.SubAreaId
                    where u.CodigoEmp = ${codigoEmp}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getGruposIntegrantes(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select distinct
                                                lg.Id
                                                ,gp.Id as GrupoId
                                                ,lg.Descripcion as grupo
                                                ,u.CodigoEmp
                                                ,lu.Nombres
                                                ,gp.PuestoTrId
                                                ,pt.Descripcion as puestoTr
                                                from strListaGrupos lg
                                                    inner join StrGrupo gp on gp.GrupoId = lg.Id
                                                    inner join StrUsuario u on gp.CodigoEmp = u.CodigoEmp
                                                    inner join loginUsuarios lu on lu.CodigoEmp = gp.CodigoEmp
                                                    inner join strPuestosTrabajos pt on pt.id = gp.PuestoTrId`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }
  //Registro Produccion

  async insHeaderRegistro(header, callback) {
    try {
      await sql.connect(this.setting);
      const search = await sql.query`select count(*) as existe from HeaderReg  
            where GrupoId = ${header.GrupoId} and TurnoId = ${header.TurnoId}
            and PuestoTrabajoId = ${header.PuestoTrabajoId} 
            and convert(date,Fecha,101) = ${header.Fecha}
            `;
      if (search.recordset[0].existe == 0) {
        const result = await sql.query`insert into HeaderReg 
                                                (Fecha, GrupoId, TurnoId, PuestoTrabajoId, Estatus, UsrReg, RegDate)
                                                values (${header.Fecha}, ${header.GrupoId}, 
                                                    ${header.TurnoId}, ${header.PuestoTrabajoId}, 
                                                    ${header.Estatus}, ${header.UsrReg}, 
                                                    ${header.RegDate})`;
      }

      const result2 = await sql.query`select hea.id, hea.Fecha, hea.GrupoId,
            grp.Descripcion as Grupo, hea.TurnoId, trn.Descripcion as Turno,
            hea.PuestoTrabajoId, ptr.Descripcion as Puesto, hea.UsrReg,
            info.Nombres as UserNombre, hea.RegDate,TC,TL,TE,TR,TI,TIM,TIO,TPP,
            TPPM,TPPO,TU,TPU,TOPR,TOMP
                from HeaderReg hea
                    inner join StrListaGrupos grp on hea.GrupoId = grp.id
                    inner join StrPuestosTrabajos ptr on hea.PuestoTrabajoId = ptr.id
                    inner join LoginUsuarios info on hea.UsrReg = info.CodigoEmp
                    inner join StrListaTurnos trn on hea.TurnoId = trn.Id
                    where hea.GrupoId = ${header.GrupoId} and hea.TurnoId = ${header.TurnoId}
                        and hea.PuestoTrabajoId = ${header.PuestoTrabajoId} 
                        and convert(date,hea.Fecha,101) = ${header.Fecha}`;
      callback(null, result2);
    } catch (e) {
      callback(e, null);
    }
  }

  async getHeaderRegistro(HeaderId, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select hea.id, hea.Fecha, hea.GrupoId,
                                                grp.Descripcion as Grupo, hea.TurnoId, trn.Descripcion as Turno,
                                                hea.PuestoTrabajoId, ptr.Descripcion as Puesto, hea.UsrReg,
                                                info.Nombres as UserNombre, hea.RegDate,TC,TL,TE,TR,TI,TIM,TIO,TPP,
                                                TPPM,TPPO,TU,TPU,TOPR,TOMP
                                                    from HeaderReg hea
                                                        inner join StrListaGrupos grp on hea.GrupoId = grp.id
                                                        inner join StrPuestosTrabajos ptr on hea.PuestoTrabajoId = ptr.id
                                                        inner join LoginUsuarios info on hea.UsrReg = info.CodigoEmp
                                                        inner join StrListaTurnos trn on hea.TurnoId = trn.Id
                                                        where hea.Id = ${HeaderId} `;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getregproddata(headerid, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select prod.id
                    ,prod.OrdenProdId
                    ,ord.Orden 
                    ,comp.Componente as mprima
                    ,par.Partida as lote
                    ,ord.Material as producto
                    ,prod.Hora
                    ,ord.Eph
                    ,comp.Un_Medida as umb
                    ,prod.PT_UME as ume
                    ,(select sum(MP_UME) from PosRegProdComponente where PosProdId = prod.Id ) as mpume
                    ,cb.Descripcion as comb
                    ,prod.TotalComb as conscomb
                    ,prod.Total_Potencia as conselect 
                    ,prod.Notas
                        from PosRegProd prod
                            inner join tbOrdenProduccion ord on prod.OrdenProdId = ord.id
                            inner join tbOrdenProduccionComp comp on ord.Orden = comp.Orden
                            inner join tbOrdenCompPartida par on comp.Id = par.OrdenComponenteId
                            inner join tbCombustibleTipoAux cb on cb.Id = prod.TipoCombId
                    where prod.HeaderRegId = ${headerid}`;

      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async insProdComp(ProdComp, callback) {
    try {
      await sql.connect(this.setting);
      const query = await sql.query`insert into PosRegProdComponente 
                                                (PosProdId, CodComponentes, Batch, MP_UME, MP_UMB, MP_Factor, UsrReg, RegDate, UpdDate)
                                                values (${ProdComp.PosProdId}, ${ProdComp.CodComponentes}, ${ProdComp.Batch}, 
                                                    ${ProdComp.MP_UME}, ${ProdComp.MP_UMB} ,${ProdComp.MP_Factor}, ${ProdComp.UsrReg},getdate(), getDate())`;
      callback(null, query);
    } catch (e) {
      callback(e, null)
    }
  }

  async getProdComp(PosProdId, callback) {
    try {
        await sql.connect(this.setting)
        const result = await sql.query`select * 
                                              from PosRegProdComponente
                                                where PosProdId = ${PosProdId}`
        callback(null, result)
    } catch (e) { 
        callback(e, null)
    }
  }

  async delProdComp(PosProdId, callback) {
    try {
        await sql.connect(this.setting)
        const query = await sql.query`delete from PosRegProdComponente
                                                where Id = ${PosProdId}`
        
        callback(null, query)
    } catch (e) { 
        callback(e, null)
    }
  }

  async insProdData(proddat, callback) {
    try {
      await sql.connect(this.setting);
      const query = await sql.query`insert into PosRegProd 
                                                (HeaderRegId, OrdenProdId, Hora, PT_UME, PT_UMB, Notas, TipoCombId, TotalComb, EPH, UsrReg, RegDate, UpdDate)
                                                values (${proddat.HeaderRegId}, ${proddat.OrdenProdId}, ${proddat.Hora}, ${proddat.PT_UME}, 
                                                    ${proddat.PT_UMB}, ${proddat.Notas}, ${proddat.TipoCombId}, ${proddat.TotalComb}, ${proddat.EPH}, ${proddat.UsrReg},
                                                    getdate(), getDate())`; 

      const result = await sql.query`select prod.id
                                        ,prod.OrdenProdId
                                        ,ord.Orden 
                                        ,comp.Componente as mprima
                                        ,par.Partida as lote
                                        ,ord.Material as producto
                                        ,prod.Hora
                                        ,ord.Eph
                                        ,comp.Un_Medida as umb
                                        ,prod.PT_UME as ume
                                        ,(select sum(MP_UME) from PosRegProdComponente where PosProdId = prod.Id ) as mpume
                                        ,cb.Descripcion as comb
                                        ,prod.TotalComb as conscomb
                                        ,prod.Total_Potencia as conselect 
                                        ,prod.Notas
                                            from PosRegProd prod
                                                inner join tbOrdenProduccion ord on prod.OrdenProdId = ord.id
                                                inner join tbOrdenProduccionComp comp on ord.Orden = comp.Orden
                                                inner join tbOrdenCompPartida par on comp.Id = par.OrdenComponenteId
                                                inner join tbCombustibleTipoAux cb on cb.Id = prod.TipoCombId
                                          where prod.HeaderRegId = ${proddat.HeaderRegId}`;

      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async updProdData(proddat, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`update PosRegProd set 
                                            OrdenProdId = ${proddat.OrdenProdId}, 
                                            Hora = ${proddat.Hora}, 
                                            PT_UME = ${proddat.PT_UME}, 
                                            PT_UMB = ${proddat.PT_UMB}, 
                                            Notas = ${proddat.Notas}, 
                                            TotalComb = ${proddat.TotalComb}, 
                                            Total_Potencia = ${proddat.Total_Potencia}, 
                                            UsrReg = ${proddat.UsrReg}, 
                                            UpdDate = getDate()
                                            where id = ${proddat.id}`;
    } catch (e) {
      callback(e, null);
    }
  }

  async insPosRegParada(paradadata, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`insert into PosRegParada
                                                (HeaderRegId, HoraInicio, HoraFin, Cargo, MP_Perd, MP_Desc,
                                                    OrdenProdId, MotivoFallaId, MotivoFallaSubAreaId, MotivoFallaLugarAveriaId, 
                                                    ,Notas, TipoGatillo, UsrReg, RegDate, UpdDate)
                                                values (${paradadata.HeaderRegId}, ${paradadata.HoraInicio},
                                                    ${paradadata.HoraFin}, ${paradadata.Cargo}, ${paradadata.MP_Perd},
                                                    ${paradadata.MP_Desc}, ${paradadata.OrdenProdId}, ${paradadata.MotivoFallaId},
                                                    ${paradadata.MotivoFallaSubAreaId}, ${paradadata.MotivoFallaLugarAveriaId}, 
                                                    '${paradadata.Notas}', 1 ,${paradadata.UsrReg}, getDate(), getDate())`;
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  }

  async updPosRegParada(paradadata, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`update PosRegParada set
                                                HoraInicio = ${paradadata.HoraInicio}, 
                                                HoraFin = ${paradadata.HoraFin}, 
                                                Cargo = ${paradadata.Cargo}, 
                                                MP_Perd = ${paradadata.MP_Perd}, 
                                                MP_Desc = ${paradadata.MP_Desc},
                                                OrdenProdId = ${paradadata.OrdenProdId}, 
                                                MotivoFallaId = ${paradadata.MotivoFallaId},
                                                MotivoFallaSubAreaId = ${paradadata.MotivoFallaSubAreaId},
                                                MotivoFallaLugarAveriaId = ${paradadata.MotivoFallaLugarAveriaId},
                                                Notas = '${paradadata.Notas}', 
                                                UsrReg = ${paradadata.UsrReg},
                                                UpdDate = getDate()
                                                where id = ${paradadata.id}
                                                `;
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  }

  async getPosRegParada(headerid, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select par.Id as idreg
            ,par.HoraInicio as horaI
            ,par.HoraFin as horaF
            ,par.Tiempo
            ,t.TiempoStandard as tprogramado
            ,c.Codigo as cargo
            ,ar.Denominacion as area
            ,sub.Denominacion as lugar
            ,lug.Denominacion as equipo
            ,fa.Denominacion as causa
            ,par.MP_Perd as plqp
            ,par.MP_Desc as plqd
            ,ord.Orden as ordennp
            ,ord.Material as prod
            ,'' as proda
            ,par.Notas
                from PosRegParada par
                    inner join tbListaCargos c on c.id = par.Cargo
                    inner join tbMatrizTiempoEstandar t on t.Cargo = c.Codigo
                    inner join tbmotivoFallaArea ar on par.MotivoFallaAreaId = ar.Id
                    inner join tbMotivoFallaSubArea  sub on par.MotivoFallaSubAreaId = sub.Id
                    inner join tbMotivoFallaLugarAveria  lug on par.MotivoFallaLugarAveriaId = lug.id
                    inner join tbMotivoFalla fa on fa.id = par.MotivoFallaId
                    inner join tbOrdenProduccion ord on ord.Id = par.OrdenProdId
                    where par.HeaderRegId = ${headerid}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }
  async insPosRegParada(regParadaD, callback) {
    try {
      await sql.connect(this.setting);
      await sql.query`insert into PosRegParada (HeaderRegId, HoraInicio, HoraFin, Cargo, 
                                    MotivoFallaId, MotivoFallaAreaId, MotivoFallaLugarAveriaId,
                                    MotivoFallaSubAreaId,MP_Perd, MP_Desc, Notas, OrdenProdId, UsrReg, RegDate, UpdDate)
                                    values (${regParadaD.HeaderRegId}, ${regParadaD.HoraI}, ${regParadaD.HoraF}, ${regParadaD.Cargo}, ${regParadaD.Motivo},
                                        ${regParadaD.AreaFallaId}, ${regParadaD.LugarAveriaId},
                                        ${regParadaD.subArea}, ${regParadaD.MpPerd}, ${regParadaD.MpDesc},${regParadaD.Notas}, ${regParadaD.OrdenProdId},
                                        ${regParadaD.UsrReg}, getDate(), getDate())`;

      const result = await sql.query`	select par.Id as idreg
                                            ,par.HoraInicio as horaI
                                            ,par.HoraFin as horaF
                                            ,par.Tiempo
                                            ,t.TiempoStandard as tprogramado
                                            ,c.Codigo as cargo
                                            ,ar.Denominacion as area
                                            ,sub.Denominacion as lugar
                                            ,lug.Denominacion as equipo
                                            ,fa.Denominacion as causa
                                            ,par.MP_Perd as plqp
                                            ,par.MP_Desc as plqd
                                            ,ord.Orden as ordennp
                                            ,ord.Material as prod
                                            ,'' as proda
                                            ,par.Notas
                                                from PosRegParada par
                                                    inner join tbListaCargos c on c.id = par.Cargo
                                                    inner join tbMatrizTiempoEstandar t on t.Cargo = c.Codigo
                                                    inner join tbmotivoFallaArea ar on par.MotivoFallaAreaId = ar.Id
                                                    inner join tbMotivoFallaSubArea  sub on par.MotivoFallaSubAreaId = sub.Id
                                                    inner join tbMotivoFallaLugarAveria  lug on par.MotivoFallaLugarAveriaId = lug.id
                                                    inner join tbMotivoFalla fa on fa.id = par.MotivoFallaId
                                                    inner join tbOrdenProduccion ord on ord.Id = par.OrdenProdId
                                                where par.HeaderRegId = ${regParadaD.HeaderRegId}`;

      callback(null, result);
    } catch (e) {
      callback(e.info, null);
    }
  }
  async updPosRegParada(regParadaD, callback) {
    try {
      await sql.connect(this.setting);
      await sql.query`update PosRegParada set HoraInicio = ${regParadaD.HoraI}
                                                    ,HoraFin = ${regParadaD.HoraF}
                                                    ,Cargo = ${regParadaD.Cargo}
                                                    ,MotivoFallaId = ${regParadaD.Motivo}
                                                    ,MotivoFallaSubAreaId = ${regParadaD.subArea}
                                                    ,MP_Perd = ${regParadaD.MpPerd}
                                                    ,MP_Desc =  ${regParadaD.MpDesc}
                                                    ,Notas = '${regParadaD.Notas}'
                                                    ,OrdenProdId = ${regParadaD.Orden}
                                                    ,UsrReg = ${regParadaD.UsrReg}
                                                    ,UpdDate = getDate()
                                    where id = ${regParadaD.Id}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }
  async getOrdenes(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * from TbOrdenProduccion where FechaFin > getDate()`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }
  async getMPrima(Orden, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * from TbOrdenProduccionComp where Orden = ${Orden}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getEquipos(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select Id, Denominacion from tbMotivoFalla`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getCargos(callback) {
    try {
      await sql.connect(this.setting);
      const resutl = await sql.query`select * from tbListaCargos`;
      callback(null, resutl);
    } catch (e) {
      callback(e, null);
    }
  }

  async getMotivoFallaArea(PuestoTr, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * 
                                        from tbMotivoFallaArea 
                                            where PuestoTrabajoId=${PuestoTr}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getMotivoFallaSubArea(AreaId, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * 
                                        from tbMotivoFallaSubArea 
                                            where MotivoFallaAreaId=${AreaId}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getMotivoFallaLugarAveria(SubArea, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * 
                                        from tbMotivoFallaLugarAveria 
                                            where SubAreaAveriaId=${SubArea}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getMotivoFalla(LugarAveriaId, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * 
                                        from tbMotivoFalla 
                                            where LugarAveriaId=${LugarAveriaId}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getTipoComb(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * 
                                from tbCombustibleTipoAux`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  //Ordenes Sap
  async InsSapOrdenes(ordenesField, callback) {
    try {
      let valor = parseFloat(ordenesField.vgw01Field.replace("*", ""));
      let orden = ordenesField.aufnrField.replace(/^0+/, "");

      await sql.connect(this.setting);
      await sql.query`insert into tbOrdenProduccion_temp (
                Orden, 
                Material, 
                Prog,
                UndMedida,
                FechaInicio,
                FechaFin,
                EPH,
                HojaRuta,
                NumOperacion,
                CantBase,
                ValorPrefijado,
                VerFab,
                PuestoTrabajo,
                Centro
                )
                values(${orden}, 
                        ${ordenesField.plnbezField},
                        ${parseFloat(ordenesField.gamngField)},
                        ${ordenesField.gmeinField}, 
                        ${ordenesField.gstrpField},
                        ${ordenesField.gltrsField},
                        ${parseFloat(ordenesField.ephField)}, 
                        ${parseInt(ordenesField.plnnrField)},
                        ${ordenesField.vornrField},
                        ${parseFloat(ordenesField.bmschField)}, 
                        ${valor},
                        ${ordenesField.veridField},
                        ${ordenesField.arbplField},
                        ${ordenesField.werksField}
                        )`;
      let result = await sql.query`select * 
                                    from tbOrdenProduccion_temp`;
      callback(result, null);
    } catch (e) {
      callback(e, null);
    }
  }

  async InsSapOrdenesComp(componentesField, callback) {
    try {
      await sql.connect(this.setting);
      await sql.query`insert into tbOrdenProduccionComp_temp (
                Orden, 
                Componente, 
                Un_Medida)
                values (${componentesField.aufnrField.replace(/^0+/, "")}, 
                        ${componentesField.idnrkField},
                        ${componentesField.meinsField})`;

      let result = await sql.query`select * 
                        from tbOrdenProduccionComp_temp`;
      callback(result, null);
    } catch (e) {
      callback(e, null);
    }
  }

  async SpSapOrdenes() {
    try {
      await sql.connect(this.setting).then((pool) => {
        return pool.request().execute("sp_SapInsertUpdateOrdenes");
      });
    } catch (e) {}
  }

  //Chatarra

  async insChatarraHeader(chatarraHeader, callback) {
    try {
      await sql.connect(this.setting);
      const search = await sql.query`select h.*, t.Descripcion as Turno, l.Nombres as Operador 
                                                from HeaderChatarra h
                                                    inner join strListaTurnos t on t.Id = h.TurnoId
                                                    inner join loginUsuarios l on l.CodigoEmp = h.OperadorId
                                                    where convert(date,Fecha,101) =${chatarraHeader.Fecha} and
                                                        TurnoId=${chatarraHeader.Turno} and
                                                        OperadorId=${chatarraHeader.Operador}`;
      if (search.recordset.length > 0) {
        callback(null, search);
      } else {
        await sql.query`insert into HeaderChatarra (Fecha, TurnoId, OperadorId, 
                                            Estatus, UsrReg, RegDate)
                                            values(convert(date,${chatarraHeader.Fecha},101),${chatarraHeader.Turno},
                                                ${chatarraHeader.Operador}, ${chatarraHeader.Estatus},
                                                ${chatarraHeader.UsrReg}, ${chatarraHeader.RegDate})`;

        const search = await sql.query`select h.*, t.Descripcion as Turno, l.Nombres as Operador 
                                            from HeaderChatarra h
                                                inner join strListaTurnos t on t.Id = h.TurnoId
                                                inner join loginUsuarios l on l.CodigoEmp = h.OperadorId
                                                    where convert(date,Fecha,101) =${chatarraHeader.Fecha} and
                                                        TurnoId=${chatarraHeader.Turno} and
                                                        OperadorId=${chatarraHeader.Operador}`;
        callback(null, search);
      }
    } catch (e) {
      callback(e, null);
    }
  }

  async insChatarraPos(ChatarraPos, callback) {
    try {
      await sql.connect(this.setting);
      await sql.query`insert into PosChatarra (HeaderId, PuestoTrId,
                                                PesoEntrada, PesoSalida, PesoChatarra, TipoChatarraId,
                                                MotivoChatarraId, Texto, UsrReg, RegDate, UpdDate)
                                            values (${ChatarraPos.HeaderId}, ${ChatarraPos.PuestoTr},
                                                ${ChatarraPos.PesoEntrada}, ${ChatarraPos.PesoSalida}, ${ChatarraPos.PesoChatarra},
                                                ${ChatarraPos.TipoChatarra}, ${ChatarraPos.MotivoChatarra}, 
                                                ${ChatarraPos.Texto}, ${ChatarraPos.UsrReg}, 
                                                ${ChatarraPos.RegDate}, ${ChatarraPos.UpdDate})`;

      const search = await sql.query`select p.*, t.Descripcion as puestoTr
                                                        , m.Denominacion as motivo  
                                                        , ti.Denominacion as tipochatarra
                                                        from PosChatarra p 
                                                            inner join strPuestosTrabajos t on t.Id = p.PuestoTrId
                                                            inner join tbChatarraMotivo m on m.Id = p.MotivoChatarraId
                                                            inner join tbChatarraTipo ti on ti.Id = p.tipoChatarraId
                                                        where HeaderId =${ChatarraPos.HeaderId}`;
      callback(null, search);
    } catch (e) {
      callback(e, null);
    }
  }

  async getChatarraPos(HeaderId, callback) {
    try {
      await sql.connect(this.setting);
      const search = await sql.query`select p.*, t.Descripcion as puestoTr
                                            , m.Denominacion as motivo  
                                            , ti.Denominacion as tipochatarra
                                            from PosChatarra p 
                                                inner join strPuestosTrabajos t on t.Id = p.PuestoTrId
                                                inner join tbChatarraMotivo m on m.Id = p.MotivoChatarraId
                                                inner join tbChatarraTipo ti on ti.Id = p.tipoChatarraId
                                                        where HeaderId =${HeaderId}`;

      callback(null, search);
    } catch (e) {
      callback(e, null);
    }
  }

  async getChatarraTipo(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * from tbChatarraTipo`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  async getChatarraMotivo(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * from tbChatarraMotivo`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }

  /// Demora
  async getDemora(demora, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select p.HoraInicio
                                              ,p.HoraFin
                                              ,p.Tiempo
                                              ,stan.TiempoStandard
                                              ,car.Codigo as cargo
                                              ,area.Denominacion area_falla
                                              ,lug.Denominacion Equipo
                                              ,fa.Denominacion CausaFalla
                                              ,p.MP_Perd
                                              ,p.MP_Desc
                                              ,ord.Orden
                                              ,ord.Material
                                              ,ma.Perfil
                                              ,p.Notas
                                              ,tr.Descripcion as gatillo
                                              ,p.EstadoTF
                                              ,p.ComentarioDemora
                                              from PosRegParada p
                                                inner join HeaderReg h on p.HeaderRegId = h.Id
                                                inner join tbMatrizTiempoEstandar stan on p.Tprog_Id = stan.Id
                                                inner join tbListaCargos car on car.id = p.Cargo
                                                inner join tbMotivoFallaArea area on area.Id = p.MotivoFallaAreaId
                                                inner join tbMotivoFallaLugarAveria lug on lug.Id = p.MotivoFallaLugarAveriaId
                                                inner join tbMotivoFalla fa on fa.Id = p.MotivoFallaId
                                                inner join tbOrdenProduccion ord on ord.Id = p.OrdenProdId
                                                inner join tbMateriales ma on ord.Material = ma.Material
                                                inner join strListaGatillos tr on tr.Id = p.TipoGatillo 
                                              where convert(date,h.Fecha,101) between 
                                                      CONVERT(date,${demora.FechaI},101) and CONVERT(date,${demora.FechaF},101) and
                                                      h.PuestoTrabajoId = ${demora.PtrId}`;
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }

  //Notificaciones Co11
  async regHeaderNotif (header, callback) {
    try {
      await sql.connect(this.setting)
      await sql.query`insert into HeaderNotificacion (Orden, Operacion, FechaCont, Centro, UndMedida, CantNot, 
                                        HoraMaquina, UndHM, HoraHombre, UnHH, Turno, UnTurno, RegHeaderId, RegSap , UsrReg, PuestoTrabajoid, RegDate, UpdDate)
                                  select                         
                                        o.Orden,
                                        o.NumOperacion,
                                        h.Fecha ,
                                        n.[Centro Planif],
                                        n.[UM PT],
                                        sum(p.PT_UMB),
                                        sum(p.TU),
                                        n.[UM Actividad 1],
                                        sum(p.TC),
                                        n.[UM Actividad 2],
                                        h.TurnoId,
                                        n.[UM Actividad 3],
                                        h.Id,
                                        0,
                                        ${header.codigo},
                                        ${header.ptr},
                                        GETDATE(),
                                        GETDATE()
                                        from HeaderReg h
                                        inner join PosRegProd p on p.HeaderRegId = h.Id
                                        inner join tbOrdenProduccion o on o.Id = p.OrdenProdId
                                        inner join tbNotificacionAux n on h.PuestoTrabajoId = n.PuestoTrabajoid
                                        inner join strListaTurnos t on t.Id = h.TurnoId
                                        where  h.Id = ${header.id}
                                        group by o.Orden, o.NumOperacion, h.Fecha, h.id, 
                                        n.[Centro Planif], n.[UM PT], n.[UM Actividad 1], n.[UM Actividad 2], n.[UM Actividad 3], 
                                        h.TurnoId, t.Descripcion`
      const result = await sql.query`SELECT @@IDENTITY as headerId`
      callback(null, result)                              
    }                                      
    catch(e) {
      callback(e, null)
    }
  }
  async regPosNotif (posData, callback) {
    try {
      await sql.connect(this.setting) //${header.headerId}  ${header.id} 
      await sql.query`insert into PosNotificacion (HeaderId ,Material, Centro, Almacen, Clmv, Cant,UndMed, Batch, RegHeaderId, PuestoTrabajoId, RegDate)
      select  ${posData.headerId},
              o.Material,
              n.[Centro Planif] as centro,
              n.[Almacen PT] as almacen,
              n.[CIMv PT] as Clmv,
              sum(c.MP_UMB) as cant,
              n.[UM PT] as UndMed,
              isnull(0,c.Batch),
              h.Id,
              h.PuestoTrabajoId,
              GETDATE()
              from HeaderReg h
              inner join PosRegProd p on p.HeaderRegId = h.Id
              inner join PosRegProdComponente c on c.PosProdId = p.id
              inner join tbOrdenProduccion o on o.id = p.OrdenProdId
              inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
              where h.Id = ${posData.id}
              group by h.Id,o.Material,n.[Centro Planif], n.[Almacen PT], n.[CIMv PT], n.[UM PT], c.Batch, h.PuestoTrabajoId`
      callback(null, "Ok")
    }
    catch(e) {
      callback(e, null)
    }
  }
  async getNotifHeader (header, callback) {
    try {
      await sql.connect(this.setting) //${header.Fecha} ${header.PtrId}
      const result = await sql.query`select 
                                        h.Id,
                                        o.Orden,
                                        o.NumOperacion as Operacion,
                                        h.Fecha as FechaCount,
                                        n.[Centro Planif] as Centro,
                                        n.[UM PT] as UndMedida,
                                        sum(p.PT_UMB) as CantNot,
                                        sum(p.TU) as HoraMaquina,
                                        n.[UM Actividad 1] as UndHM,
                                        sum(p.TC) as HoraHombre,
                                        n.[UM Actividad 2] as UnHH,
                                        h.TurnoId as Turno,
                                        t.Descripcion as TurnoDesc,
                                        n.[UM Actividad 3] as UnTurno,
                                        0 as RegSap,
                                        h.Id as hid
                                        from HeaderReg h
                                        inner join PosRegProd p on p.HeaderRegId = h.Id
                                        inner join tbOrdenProduccion o on o.Id = p.OrdenProdId
                                        inner join tbNotificacionAux n on h.PuestoTrabajoId = n.PuestoTrabajoid
                                        inner join strListaTurnos t on t.Id = h.TurnoId
                                        where convert(date,h.Fecha,101) = CONVERT(date,${header.Fecha},101) and h.PuestoTrabajoId = ${header.PtrId} and
                                        h.Id not in (select RegHeaderId from HeaderNotificacion 
                                            where convert(date,FechaCont,101) = CONVERT(date,${header.Fecha},101) and PuestoTrabajoId = ${header.PtrId} )
                                        group by o.Orden, o.NumOperacion, h.Fecha, h.id, 
                                          n.[Centro Planif], n.[UM PT], n.[UM Actividad 1], n.[UM Actividad 2], n.[UM Actividad 3], 
                                          h.TurnoId, t.Descripcion
                                    union all
                                      select n.Id,
                                          n.Orden,
                                          n.Operacion,
                                          n.FechaCont,
                                          n.Centro,
                                          n.UndMedida,
                                          n.CantNot,
                                          n.HoraMaquina,
                                          n.UndHM,
                                          n.HoraHombre,
                                          n.UnHH,
                                          n.Turno,
                                          t.Descripcion as TurnoDesc,
                                          n.UnTurno,
                                          n.RegSap,
                                          '0' as hid 
                                            from HeaderNotificacion n inner join strListaTurnos t on t.Id = n.Turno 
                                            where convert(date,n.FechaCont,101) = CONVERT(date,${header.Fecha},101) and n.PuestoTrabajoId = ${header.PtrId}`

      callback(null, result)
    } catch (error) {
      callback(error, null)
    }
  }
  async getNotifPos (pos, callback) {
    try {
      await sql.connect(this.setting) //${pos.Fecha} ${pos.PtrId}
        const result = await sql.query`select  h.id  as hid,
                          o.Material,
                          n.[Centro Planif] as centro,
                          n.[Almacen PT] as almacen,
                          n.[CIMv PT] as Clmv,
                          sum(c.MP_UMB) as cant,
                          n.[UM PT] as UndMed,
                          c.Batch
                          from HeaderReg h
                              inner join PosRegProd p on p.HeaderRegId = h.Id
                              inner join PosRegProdComponente c on c.PosProdId = p.id
                              inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                              inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                              where convert(date,h.Fecha,101) = CONVERT(date,${pos.Fecha},101) and h.PuestoTrabajoId = ${pos.PtrId}
                      and h.id not in ( select RegHeaderId from PosNotificacion where PuestoTrabajoId = ${pos.PtrId} and RegHeaderId = h.Id) 
                              group by h.Id,o.Material,n.[Centro Planif], n.[Almacen PT], n.[CIMv PT], n.[UM PT], c.Batch
                  union all
                  select p.RegHeaderId as hid, 
                      Material, 
                      p.Centro, 
                      Almacen, 
                      Clmv, 
                      Cant, 
                      UndMed, 
                      Batch 
                      from PosNotificacion p 
                        inner join HeaderNotificacion h on h.Id = p.RegHeaderId	
                          where p.PuestoTrabajoId = ${pos.PtrId} and convert(date,h.FechaCont,101) = CONVERT(date,${pos.Fecha},101)`
      callback(null, result);
    } catch (error) {
      callback(error, null)
    }
  }
  //Notificaciones MFBF
  async RegHeaderNotifMFBF (header, callback) {
    try {
      await sql.connect(this.setting)
      await sql.query`insert into headernotifmfbf (Material, CentroPlanif, Centro, Almacen, VerFab, PuestoTrabajo, PuestoTrabajoId, Fecha, DocDate, UndMedida, CantNot, HeaderId, RegSap, UsrReg, RegDate, UpdDate)  
                    select o.Material,
                        n.[Centro Planif],
                        n.Centro,
                        n.[Almacen PT],
                        o.VerFab,
                        o.PuestoTrabajo,
                        n.PuestoTrabajoid,
                        CONVERT(date,h.Fecha,101) as Fecha,
                        CONVERT(date,h.Fecha,101) as docdate,
                        sum(p.PT_UMB) UndMedida,
                        n.[UM PT] as CantNot,
                        h.Id,
                        0,
                        ${header.codigo},
                        GETDATE(),
                        GETDATE()
                        from HeaderReg h
                        inner join PosRegProd p on h.Id = p.HeaderRegId
                        inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                        inner join tbNotificacionAux n on h.PuestoTrabajoId = n.PuestoTrabajoid
                        where convert(date,h.Fecha,101) = CONVERT(date,${header.Fecha},101) and h.PuestoTrabajoId = ${header.ptr} and h.Id = ${header.id}
                        group by o.Material, n.[Centro Planif], n.Centro, n.[Almacen PT], o.VerFab, o.PuestoTrabajo, h.Fecha, n.[UM PT], h.Id, n.PuestoTrabajoid`
      const result = await sql.query`SELECT @@IDENTITY as headerId`
      callback(null, result)       
    } catch (e) {
      callback(e,null)
    }
  }
  async regMfbfPos (PosData, callback) {
    try {
      await sql.connect(this.setting) 
      await sql.query`insert into PosNotifMFBF (HeaderId, Material, Centro, Almacen, Batch, Clmv, Cant, UndMed, HeaderDate, PuestoTrabajoId, RegDate) 
                      select ${PosData.hid},
                          o.Material,
                          n.Centro as centro,
                          n.[Almacen PT] as almacen,
                          '' as batch,
                          n.[CIMv PT] as Clmv,
                          sum(p.PT_UMB) as cant,
                          n.[UM PT] as UndMed,
                          h.Fecha,
                          h.PuestoTrabajoId,
                          GETDATE()
                          from HeaderReg h
                              inner join PosRegProd p on p.HeaderRegId = h.id
                              inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                              inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                              where convert(date,h.Fecha,101) = CONVERT(date,${PosData.Fecha},101) 
                                and h.PuestoTrabajoId = ${PosData.ptr} and h.Id =  ${PosData.hid}
                              group by o.Material, n.Centro, n.[Almacen PT], n.[CIMv PT], n.[UM PT], h.PuestoTrabajoId, h.Id, h.Fecha`
      callback(null, 'OK')
    } catch (error) {
      callback(error, null)
    }
  }
  async getMfbf (header, callback) {
    try {
      await sql.connect(this.setting) 
      const result = await sql.query`select	h.Id,
      o.Material,
          n.[Centro Planif] as centroPlanif,
          n.Centro,
          n.[Almacen PT] as almacen,
          o.VerFab,
          o.PuestoTrabajo,
          CONVERT(date,h.Fecha,101) as Fecha,
          CONVERT(date,h.Fecha,101) as docdate,
          sum(p.PT_UMB) UndMedida,
          n.[UM PT] as cantnot,
          h.Id as HeaderId,
          0 as RegSap
          from HeaderReg h
          inner join PosRegProd p on h.Id = p.HeaderRegId
          inner join tbOrdenProduccion o on o.id = p.OrdenProdId
          inner join tbNotificacionAux n on h.PuestoTrabajoId = n.PuestoTrabajoid
          where convert(date,h.Fecha,101) = CONVERT(date,${header.Fecha},101) and h.PuestoTrabajoId = ${header.PtrId} 
      and h.Id not in (select HeaderId from HeaderNotifMFBF where convert(date,Fecha,101) = CONVERT(date,${header.Fecha},101) and PuestoTrabajoId = ${header.PtrId})
          group by o.Material, n.[Centro Planif], n.Centro, n.[Almacen PT], o.VerFab, o.PuestoTrabajo, h.Fecha, n.[UM PT],h.Id
  union all 
    select Id,
        Material,
        CentroPlanif,
        Centro,
        Almacen,
        VerFab,
        PuestoTrabajo,
        Fecha,
        DocDate,
        UndMedida,
        CantNot,
        0,
        RegSap
        from HeaderNotifMFBF 
        where convert(date,Fecha,101) = CONVERT(date,${header.Fecha},101) and PuestoTrabajoId = ${header.PtrId}`
      callback(null, result)
    } catch (error) {
      callback(error, null)
    }
  }
async getMfbfPos (header, callback) {
    try {
      await sql.connect(this.setting) 
      const result = await sql.query`select  h.Id,
                                            o.Material,
                                            n.Centro as centro,
                                            n.[Almacen PT] as almacen,
                                            '' as batch,
                                            n.[CIMv PT] as Clmv,
                                            sum(p.PT_UMB) as cant,
                                            n.[UM PT] as UndMed
                                          from HeaderReg h
                                            inner join PosRegProd p on p.HeaderRegId = h.id
                                            inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                                            inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                                            where convert(date,h.Fecha,101) = CONVERT(date,${header.Fecha},101) and h.PuestoTrabajoId = ${header.PtrId} 
                                            and h.id not in (select HeaderId from PosNotifMFBF where PuestoTrabajoId = ${header.PtrId} and  convert(date,HeaderDate,101) = CONVERT(date,${header.Fecha},101)  )
                                            group by o.Material, n.Centro, n.[Almacen PT], n.[CIMv PT], n.[UM PT], h.Id
                                        union all
                                        select  id,
                                            Material,
                                            Centro as centro,
                                            Almacen as almacen,
                                            Batch as batch,
                                            Clmv, 
                                            Cant as cant, 
                                            UndMed
                                            from PosNotifMFBF
                                              where PuestoTrabajoId = ${header.PtrId} and  convert(date,HeaderDate,101) = CONVERT(date,${header.Fecha},101)`
      callback(null, result)
    } catch (error) {
      callback(error, null)
    }
  }
}

module.exports = new Db();
