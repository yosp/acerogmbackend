const { request } = require("express");
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
  async SearchUserSap(Usuario, callback){
    try {
      await sql.connect(this.setting);
      const resutl = await sql.query`select Codigoemp
                                            ,Nombres+' '+Apellidos as nombre
                                            ,DesCodPosicion
                                            ,DesCUniOrga
                                            from SAP_Inteface..EMPLOYEE 
                                            where estatus = 3 
                                              and (Codigoemp = ${Usuario} 
                                                        or Nombres+' '+Apellidos like'%${Usuario}%')`
      callback(null, resutl)
    } catch (e) {
      callback(e, null)
    }
  }
  async SearchUser(Usuario, callback){
    try {
      await sql.connect(this.setting);
      const resutl = await sql.query`select CodigoEmp, Nombres, Estatus 
                                                from loginUsuarios 
                                                  where CodigoEmp = ${Usuario} or Nombres like'%${Usuario}%'`
      callback(null, resutl)
    } catch (e) {
      callback(e, null)
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
  async LoginRolesList(CodigoEmp, callback) {
    try {
      await sql.connect(this.setting)
      const result  = await sql.query`select lr.Id, u.CodigoEmp, u.Nombres, 
                                              r.Titulo as Rol, p.Titulo as Perfil 
                                                from loginStrRole lr 
                                                  inner join StrRoles strl on strl.Id = lr.StrRolid
                                                  inner join loginRoles r on strl.RolId = r.Id
                                                  inner join loginPerfiles p on strl.PerfilId = p.Id
                                                  inner join loginUsuarios u on u.CodigoEmp = lr.CodigoEmp
                                                  where lr.CodigoEmp = ${CodigoEmp}`
      callback(null, result)
    } catch (e) { 
      callback(e, null)
    }
  }
  async LoginRoles(CodigoEmp, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select CodigoEmp, r.Id as IdRol, 
                                            r.Titulo as rol, 
                                            p.Id as IdPerfil, p.Titulo as Perfil 
                                              from loginStrRole l 
                                                inner join StrRoles sr on sr.Id = l.StrRolid
                                                inner join loginRoles r on r.Id = sr.RolId
                                                inner join loginPerfiles p on p.Id = sr.PerfilId 
                                                where CodigoEmp = ${CodigoEmp}`;
      
      callback(null, result)
    } catch (e) {
        callback(e, null)
    }
  }
  async setNewUser(user, callback) {
    try {
      await sql.connect(this.setting);
      const request = new sql.Request()
      
      request.input('codigoEmp', sql.Int, user.codigoEmp)
      request.input('password', sql.NVarChar, user.password)

      request.execute('sp_addNewUser', (err, result) => {
        if(err) {
          console.log(err)
          callback(err, null);
        } else {
          callback(null, result)
        } 
      })
    } catch (err) {
      console.log(err)
      callback(null, result)
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
  async getUserRolList(codigoEmp, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select distinct r.Id, 
                                                    r.Titulo as rol 
                                                      from loginStrRole s 
                                                        inner join StrRoles rl on rl.Id = s.StrRolid
                                                        inner join loginRoles r on r.Id = rl.RolId
                                                        where CodigoEmp = ${codigoEmp}`;
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }
  async getRolListNotUser(codigoEmp, callback) {
    try {
      await sql.connect(this.setting)
      const result = await sql.query`select distinct r.Id, 
                                                      r.Titulo as rol 
                                                          from loginRoles r
                                                            where r.Id not in ( select distinct r.Id
                                                                        from loginStrRole s 
                                                                        inner join StrRoles rl on rl.Id = s.StrRolid
                                                                        inner join loginRoles r on r.Id = rl.RolId
                                                                        where CodigoEmp = ${codigoEmp})`
      callback(null,result)
        } 
    catch(e) {
      callback(e, null)
    }
  }
  async getRolPerfil(CodPerf, callback) {
    try {
      await sql.connect(this.setting)
      const result = await sql.query`select distinct p.Id, 
                                      p.Titulo as perfil 
                                          from loginStrRole s 
                                          inner join StrRoles rl on rl.Id = s.StrRolid
                                          inner join loginRoles r on r.Id = rl.RolId
                                          inner join loginPerfiles p on p.Id = rl.PerfilId
                                            where CodigoEmp = ${CodPerf.CodigoEmp} and r.Id = ${CodPerf.Perfil}`
      callback(null,result)
        } 
    catch(e) {
      callback(e, null)
    }
  }
  async getRolPtr(CodRol, callback) {
    try {
      await sql.connect(this.setting)
      const result = await sql.query`select p.Id
                                          , p.Descripcion as Puestotr  
                                          from strPuestosTrabajos p 
                                              inner join StrUsuario u on u.PuestoTrId = p.Id
                                                where u.CodigoEmp = ${CodRol.CodigoEmp} and u.RolId = ${CodRol.RolId}`
      callback(null,result)
        } 
    catch(e) {
      callback(e, null)
    }
  }
  async getRolNotPtr(CodRol, callback) {
    try {
      await sql.connect(this.setting)
      const result = await sql.query`select pt.Id
                                          , pt.Descripcion as Puestotr 
                                          from strPuestosTrabajos pt
                                            where pt.Id not in (
                                              select p.Id
                                                  from strPuestosTrabajos p 
                                                      inner join StrUsuario u on u.PuestoTrId = p.Id
                                                      where u.CodigoEmp = ${CodRol.CodigoEmp} and u.RolId = ${CodRol.RolId}
                                                        )`
      callback(null,result)
        } 
    catch(e) {
      callback(e, null)
    }
  }
  async getRolNotPerfil(CodPerf, callback) {
    try {
      await sql.connect(this.setting)
      const result = await sql.query`select p.Id, p.Titulo as perfil 
                                        from loginPerfiles p 
                                          where Id not in(select distinct p.Id
                                                        from loginStrRole s 
                                                        inner join StrRoles rl on rl.Id = s.StrRolid
                                                        inner join loginRoles r on r.Id = rl.RolId
                                                        inner join loginPerfiles p on p.Id = rl.PerfilId
                                                        where CodigoEmp = ${CodPerf.CodigoEmp} and r.Id = ${CodPerf.Perfil})`
      callback(null,result)
        } 
    catch(e) {
      callback(e, null)
    }
  }
  async insRolPerfil(roldata, callback) {
    try {
      await sql.connect(this.setting);
      const request = new sql.Request()
      
      request.input('CodigoEmp', sql.Int, roldata.CodigoEmp)
      request.input('RolId', sql.Int, roldata.RolId)
      request.input('PerfId', sql.Int, roldata.PerfId)

      request.execute('Sp_addRolPerfilUser', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result)
        }
      })

    } catch (err) {
      callback(err, null);
    }
  } 
  async delRolPerfil(roldata, callback) {
    try {
      const request = new sql.Request()
      await sql.connect(this.setting);
      
      request.input('CodigoEmp', sql.Int, roldata.CodigoEmp)
      request.input('RolId', sql.Int, roldata.RolId)
      request.input('PerfId', sql.Int, roldata.PerfId)

      request.execute('Sp_removeRolPerfilUser', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result)
        }
      })

    } catch (err) {
      callback(err, null);
    }
  }
  async addRolPuestoTr(RolPtr, callback) {
    try {
      const request = new sql.Request()
      await sql.connect(this.setting);
      
      request.input('CodigoEmp', sql.Int, RolPtr.CodigoEmp)
      request.input('Rol', sql.Int, RolPtr.RolId)
      request.input('PuestoTr', sql.Int, RolPtr.PuestoTr)
      request.execute('Sp_addRolPuestoTr', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result)
        }
      })
    } catch (error) {
      
    }
  }
  async delRolPuestoTr(RolPtr, callback) {
    try {
      const request = new sql.Request()
      await sql.connect(this.setting);
      
      request.input('CodigoEmp', sql.Int, RolPtr.CodigoEmp)
      request.input('Rol', sql.Int, RolPtr.RolId)
      request.input('PuestoTr', sql.Int, RolPtr.PuestoTr)
      request.execute('Sp_removeRolPuestoTr', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result)
        }
      })
    } catch (error) {
      
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
            info.Nombres as UserNombre, hea.RegDate,hea.TC,TL,TE,TR,TI,TIM,TIO,TPP,
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
                                                info.Nombres as UserNombre, hea.RegDate,hea.TC,TL,TE,TR,TI,TIM,TIO,TPP,
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
                                          ,prod.HeaderRegId
                                          ,prod.OrdenProdId
                                          ,ord.Orden 
                                          ,prod.mpid 
                                          ,comp.Componente as mprima
                                          ,par.Partida as lote
                                          ,ord.Material as producto
                                          ,prod.Hora
                                          ,ord.Eph
                                          ,prod.Batch
                                          ,comp.Un_Medida as umb
                                          ,prod.PT_UME as ume
                                          ,(select sum(MP_UME) from PosRegProdComponente where PosProdId = prod.Id ) as mpume
                                          ,isNull(cb.Id,0) combId
                                          ,isNull(cb.Descripcion,'') as comb
                                          ,isNull(prod.TotalComb,0) as conscomb
                                          ,isNull(prod.Total_Potencia,0) as conselect 
                                          ,prod.Notas
                                              from PosRegProd prod
                                              inner join tbOrdenProduccion ord on prod.OrdenProdId = ord.id
                                              inner join tbOrdenProduccionComp comp on comp.Id = prod.mpid
                                              left join tbOrdenCompPartida par on comp.Id = par.OrdenComponenteId
                                              left join tbCombustibleTipoAux cb on cb.Id = prod.TipoCombId
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
  async delPosRegProd(PosProdId, callback) {
    try {
        await sql.connect(this.setting)
        await sql.query`delete from PosRegProd where Id = ${PosProdId}`
        await sql.query`delete from PosRegProdComponente where PosProdId = ${PosProdId}`                                                
        
        callback(null, 'Ok')
    } catch (e) { 
        callback(e, null)
    }
  }
  async insProdData(proddat, callback) {
    try {
      await sql.connect(this.setting);
      const query = await sql.query`insert into PosRegProd 
                                                (HeaderRegId, OrdenProdId, mpId, Hora, PT_UME, PT_UMB, Notas, TipoCombId, TotalComb, EPH, Batch, UsrReg, RegDate, UpdDate)
                                                values (${proddat.HeaderRegId}, ${proddat.OrdenProdId}, ${proddat.MPrima}, ${proddat.Hora}, ${proddat.PT_UME}, 
                                                    ${proddat.PT_UMB}, ${proddat.Notas}, ${proddat.TipoCombId}, ${proddat.TotalComb}, ${proddat.EPH}, ${proddat.Batch}, 
                                                    ${proddat.UsrReg}, getdate(), getDate())`; 

      const result = await sql.query`select  prod.id
                                            ,prod.HeaderRegId
                                            ,prod.OrdenProdId
                                            ,ord.Orden 
                                            ,prod.mpid 
                                            ,comp.Componente as mprima
                                            ,par.Partida as lote
                                            ,ord.Material as producto
                                            ,prod.Hora
                                            ,ord.Eph
                                            ,prod.Batch 
                                            ,comp.Un_Medida as umb
                                            ,prod.PT_UME as ume
                                            ,(select sum(MP_UME) from PosRegProdComponente where PosProdId = prod.Id ) as mpume
                                            ,isNull(cb.Id,0) combId
                                            ,isNull(cb.Descripcion,'') as comb
                                            ,isNull(prod.TotalComb,0) as conscomb
                                            ,isNull(prod.Total_Potencia,0) as conselect 
                                            ,prod.Notas
                                                from PosRegProd prod
                                                inner join tbOrdenProduccion ord on prod.OrdenProdId = ord.id
                                                inner join tbOrdenProduccionComp comp on comp.Id = prod.mpid
                                                left join tbOrdenCompPartida par on comp.Id = par.OrdenComponenteId
                                                left join tbCombustibleTipoAux cb on cb.Id = prod.TipoCombId
                                          where prod.HeaderRegId = ${proddat.HeaderRegId}`;

      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  }
  async updProdData(proddat, callback) {
    try {
      const request = new sql.Request()
      await sql.connect(this.setting);
      
      request.input('Id', sql.Int, proddat.Id)
      request.input('OrdenProdId', sql.Int, proddat.OrdenProdId)
      request.input('MpId', sql.Int, proddat.MPrima)
      request.input('PT_UME', sql.Int, proddat.PT_UME)
      request.input('PT_UMB', sql.Float, proddat.PT_UMB)
      request.input('Hora', sql.DateTime, proddat.Hora)
      request.input('OldH', sql.DateTime, proddat.OldH)
      request.input('Notas', sql.Text, proddat.Notas)
      request.input('TotalComb', sql.Int, proddat.TotalComb)
      request.input('UsrReg', sql.NVarChar, proddat.UsrReg)
      request.input('EPH', sql.Float, proddat.EPH)
      request.input('Batch', sql.NVarChar, proddat.Batch)
      request.input('TipoCombId', sql.Int, proddat.TipoCombId)

      request.execute('sp_updProdData', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result.recordset)
        }
      })

    } catch (e) {
      callback(e, null);
    }
  }
  async insPosRegParada(paradadata, callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`insert into PosRegParada
                                                (HeaderRegId, HoraInicio, HoraFin, MP_Perd, MP_Desc,
                                                    OrdenProdId, MotivoFallaId, MotivoFallaAreaId, MotivoFallaSubAreaId, MotivoFallaLugarAveriaId 
                                                    ,Notas, TipoGatillo, UsrReg, RegDate, UpdDate)
                                                values (${paradadata.HeaderRegId}, ${paradadata.HoraI},
                                                    ${paradadata.HoraF}, ${paradadata.MpPerd},
                                                    ${paradadata.MpDesc}, ${paradadata.OrdenProdId}, ${paradadata.Motivo},
                                                    ${paradadata.AreaFallaId}, ${paradadata.subArea}, ${paradadata.LugarAveriaId},
                                                    ${paradadata.Notas}, 1 ,${paradadata.UsrReg}, getDate(), getDate())`;
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  }
  async updPosRegParada(paradadata, callback) {
    try {
      const request = new sql.Request()
      await sql.connect(this.setting);
      
      request.input('Id', sql.Int, paradadata.Id)
      request.input('Header', sql.Int, paradadata.HeaderRegId)
      request.input('HoraInicio', sql.DateTime, paradadata.HoraI)
      request.input('OldHI', sql.DateTime, paradadata.OldHI)
      request.input('HoraFin', sql.DateTime, paradadata.HoraF)
      request.input('OldHF', sql.DateTime, paradadata.OldHF)
      request.input('MP_Perd', sql.Int, paradadata.MpPerd)
      request.input('MP_Desc', sql.Int, paradadata.MpDesc)
      request.input('OrdenProdId', sql.Int, paradadata.OrdenProdId)
      request.input('MotivoFallaId', sql.Int, paradadata.Motivo)
      request.input('MotivoFallaSubAreaId', sql.Int, paradadata.subArea)
      request.input('MotivoFallaLugarAveriaId', sql.Int, paradadata.LugarAveriaId)
      request.input('MotivoFallaAreaId', sql.Int, paradadata.AreaFallaId)
      request.input('Notas', sql.Text, paradadata.Notas)
      request.input('UsrReg', sql.NVarChar, paradadata.UsrReg)

      request.execute('sp_updParadaData', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result.recordset)
        }
      })

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
                ,par.Cargo as cargoId
                ,c.Codigo as cargo
                ,ar.Id as areaId
                ,ar.Denominacion as area
                ,sub.Id as subAreaId
                ,sub.Denominacion as lugar
                ,lug.Id as lugarId
                ,lug.Denominacion as equipo
                ,fa.Id as vausaId
                ,fa.Denominacion as causa
                ,par.MP_Perd as plqp
                ,par.MP_Desc as plqd
                ,ord.Id as ordenId
                ,ord.Orden as ordennp
                ,ord.Material as prod
                ,'' as proda
                ,par.Notas
                from PosRegParada par
                    inner join tbListaCargos c on c.Codigo = par.Cargo
                    left join tbMatrizTiempoEstandar t on t.Cargo = c.Codigo
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
  async delPosRegParada(ParadaRegId, callback) {
    try {
      
        await sql.connect(this.setting)
        await sql.query`delete from PosRegParada where Id = ${ParadaRegId}`                                               
        callback(null, 'Ok')
    } catch (e) { 
        callback(e, null)
    }
  }
  async getOrdenes(callback) {
    try {
      await sql.connect(this.setting);
      const result = await sql.query`select * from TbOrdenProduccion where Estatus = 'A'`;
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
  // Orden Produccion
  async getOrdenesProdList(OrdenFilter, callback) {
    try{
    await sql.connect(this.setting);
      const result = await sql.query`select Id
                                            ,Orden
                                            ,Material
                                            ,PuestoTrabajo
                                            ,Prog
                                            ,UndMedida
                                            ,FechaInicio
                                            ,FechaFin
                                            ,EPH
                                            ,HojaRuta
                                            ,NumOperacion
                                            ,CantBase
                                            ,[Valor prefijado]
                                            ,VerFab
                                            ,Centro
                                            from tbOrdenProduccion
                                              where FechaInicio between convert(date,${OrdenFilter.FechaI},101) and convert(date,${OrdenFilter.FechaF},101)
                                                or FechaFin between convert(date,${OrdenFilter.FechaI},101) and convert(date,${OrdenFilter.FechaF},101) `;
      callback(null, result);
    }
    catch (e) {
      callback(e, null);
    }
  }
  async getOrdenesCompList(Orden, callback) {
    try {
    await sql.connect(this.setting);
      const result = await sql.query`select Id
                                            ,Orden
                                            ,Componente
                                            ,Un_Medida
                                            from tbOrdenProduccionComp 
                                            where Orden = (select Orden from tbOrdenProduccion where Id =  ${Orden})`;
      callback(null, result); 
    }
    catch (e) {
      callback(e, null); 
    }
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

      const search = await sql.query`select p.Id
                                              , p.HeaderId
                                              , p.PuestoTrId
                                              , p.PesoEntrada
                                              , p.PesoSalida
                                              , p.PesoChatarra
                                              , p.TipoChatarraId
                                              , p.MotivoChatarraId
                                              , p.Texto
                                              , p.UsrReg
                                              , p.RegDate
                                              , p.UpdDate
                                              , t.Descripcion as puestoTr
                                              , RTRIM(ti.Almacen) as StgeLoc
                                              , RTRIM(ti.UM) as EntryUom
                                              , ti.CIMov as MoveType
                                              , m.Denominacion as motivo  
                                              , ti.Denominacion as tipochatarra
                                              , ti.Centro as Plant
                                              , ti.CeCo as Costcenter
                                              , ti.Codigo as Material
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
      const search = await sql.query`select p.Id
                                      , p.HeaderId
                                      , p.PuestoTrId
                                      , p.PesoEntrada
                                      , p.PesoSalida
                                      , p.PesoChatarra
                                      , p.TipoChatarraId
                                      , p.MotivoChatarraId
                                      , p.Texto
                                      , p.UsrReg
                                      , p.RegDate
                                      , p.UpdDate
                                      , t.Descripcion as puestoTr
                                      , RTRIM(ti.Almacen) as StgeLoc
                                      , RTRIM(ti.UM) as EntryUom
                                      , ti.CIMov as MoveType
                                      , m.Denominacion as motivo  
                                      , ti.Denominacion as tipochatarra
                                      , ti.Centro as Plant
                                      , ti.CeCo as Costcenter
                                      , ti.Codigo as Material
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
  async setChatarraRegSap(Chatarra, callback) {
    try {
      const request = new sql.Request()
      await sql.connect(this.setting);
      
      request.input('headerId', sql.Int, Chatarra.HeaderId)
      request.input('regSap', sql.NVarChar, Chatarra.RegSap)

      request.execute('sp_SetChatarraRegSap', (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result)
        }
      })
    } catch (e) {
      callback(e, null)
    }
  }
  async delChatarraPos(PosId, callback) {
    try {
      
        await sql.connect(this.setting)
        await sql.query`delete from PosChatarra where Id = ${PosId}`                                               
        callback(null, 'Ok')
    } catch (e) { 
        callback(e, null)
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
                                                left join tbMatrizTiempoEstandar stan on p.Tprog_Id = stan.Id
                                                inner join tbListaCargos car on car.Codigo = p.Cargo
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
                                        sum(h.TU),
                                        n.[UM Actividad 1],
                                        sum(h.TC),
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
      await sql.connect(this.setting)  
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
      await sql.connect(this.setting) 
      
      const result = await sql.query`select 
                                          h.Id,
                                          o.Orden,
                                          LTRIM(RTRIM(o.NumOperacion)) as Operacion,
                                          h.Fecha as FechaCount,
                                          n.[Centro Planif] as Centro,
                                          n.[UM PT] as UndMedida,
                                          sum(p.PT_UMB) as CantNot,
                                          sum(h.TU) as HoraMaquina,
                                          n.[UM Actividad 1] as UndHM,
                                          sum(h.TC) as HoraHombre,
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
                                              LTRIM(RTRIM(n.Operacion)) as Operacion,
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
                          '0' as HeaderId,
                          o.Material,
                          n.[Centro Planif] as centro,
                          n.[Almacen PT] as almacen,
                          n.[CIMv PT] as Clmv,
                          sum(p.PT_UMB) as cant,
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
                  select  h.id  as hid,
                                            '0' as HeaderId,
                                            o.Material,
                                            n.[Centro Planif] as centro,
                                            n.[Almacen MP] as almacen,
                                            n.[CIMv MP] as Clmv,
                                            sum(p.PT_UMB) as cant,
                                            n.[UM MP] as UndMed,
                                            c.Batch
                                            from HeaderReg h
                                                inner join PosRegProd p on p.HeaderRegId = h.Id
                                                inner join PosRegProdComponente c on c.PosProdId = p.id
                                                inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                                                inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                                                where convert(date,h.Fecha,101) = CONVERT(date,${pos.Fecha},101) and h.PuestoTrabajoId = ${pos.PtrId}
                                        and h.id not in ( select RegHeaderId from PosNotificacion where PuestoTrabajoId = ${pos.PtrId} and RegHeaderId = h.Id) 
                                                group by h.Id,o.Material,n.[Centro Planif], n.[Almacen MP], n.[CIMv MP], n.[UM MP], c.Batch
                  union all
                  select p.RegHeaderId as hid, 
                      p.HeaderId,
                      Material, 
                      p.Centro, 
                      Almacen, 
                      Clmv, 
                      Cant, 
                      UndMed, 
                      Batch as Batch
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
                          n.[UM PT] as UndMedida, 
                          sum(p.PT_UMB) CantNot,
                          h.id,
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
      await sql.query`insert into PosNotifMFBF (HeaderId, Material, Centro, Almacen, Batch, Clmv, Cant, UndMed, HeaderRegId, HeaderDate, PuestoTrabajoId, RegDate) 
                      select ${PosData.id},
                          o.Material,
                          n.Centro as centro,
                          n.[Almacen PT] as almacen,
                          '' as batch,
                          n.[CIMv PT] as Clmv,
                          sum(p.PT_UMB) ,
                          n.[UM PT] ,
                          h.Id,
                          h.Fecha,
                          h.PuestoTrabajoId,
                          GETDATE()
                          from HeaderReg h
                              inner join PosRegProd p on p.HeaderRegId = h.id
                              inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                              inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                              where convert(date,h.Fecha,101) = CONVERT(date,${PosData.Fecha},101) 
                                and h.PuestoTrabajoId = ${PosData.ptr} and h.Id =  ${PosData.hid}
                              group by o.Material, n.Centro, n.[Almacen PT], n.[CIMv PT], n.[UM PT], h.PuestoTrabajoId, h.Id, h.Fecha
                      union all
                      select ${PosData.id},
                          o.Material,
                          n.Centro as centro,
                          n.[Almacen MP] as almacen,
                          '' as batch,
                          n.[CIMv MP] as Clmv,
                          sum(p.PT_UMB) ,
                          n.[UM MP] ,
                          h.Id,
                          h.Fecha,
                          h.PuestoTrabajoId,
                          GETDATE()
                          from HeaderReg h
                              inner join PosRegProd p on p.HeaderRegId = h.id
                              inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                              inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                              where convert(date,h.Fecha,101) = CONVERT(date,${PosData.Fecha},101) 
                                and h.PuestoTrabajoId = ${PosData.ptr} and h.Id =  ${PosData.hid}
                              group by o.Material, n.Centro, n.[Almacen MP], n.[CIMv MP], n.[UM MP], h.PuestoTrabajoId, h.Id, h.Fecha`
      callback(null, 'OK')
    } catch (error) {
      callback(error, null)
    }
  }
  async getMfbf (header, callback) {
    try {
      await sql.connect(this.setting) 
      const result = await sql.query`select h.Id, 
                                            o.Material,
                                            n.[Centro Planif] as centroPlanif,
                                            n.Centro,
                                            n.[Almacen PT] as almacen,
                                            o.VerFab,
                                            o.PuestoTrabajo,
                                            CONVERT(date,h.Fecha,101) as Fecha,
                                            CONVERT(date,h.Fecha,101) as docdate,
                                            n.[UM PT] as UndMedida, 
                                            sum(p.PT_UMB) CantNot,
                                            h.id as HeaderId,
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
                0 as HeaderId,
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
      const result = await sql.query`select h.id, 
                                            h.Id as hid,
                                            0 as HeaderId,
                                            o.Material,
                                            n.Centro as centro,
                                            n.[Almacen PT] as almacen,
                                            '' as batch,
                                            n.[CIMv PT] as Clmv,
                                            n.[UM PT] as UndMed,
                                            sum(p.PT_UMB) as cant
                                          from HeaderReg h
                                            inner join PosRegProd p on p.HeaderRegId = h.id
                                            inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                                            inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                                            where convert(date,h.Fecha,101) = CONVERT(date,${header.Fecha},101) and h.PuestoTrabajoId = ${header.PtrId} 
                                            and h.id not in (select HeaderRegId from PosNotifMFBF where PuestoTrabajoId = ${header.PtrId} 
                                            and  convert(date,HeaderDate,101) = CONVERT(date,${header.Fecha},101)  )
                                            group by o.Material, n.Centro, n.[Almacen PT], n.[CIMv PT], n.[UM PT], h.Id
                                        union all
                                    select  h.id,
                                            h.Id as hid,
                                            0 as HeaderId,
                                            o.Material,
                                            n.Centro as centro,
                                            n.[Almacen MP] as almacen,
                                            '' as batch,
                                            n.[CIMv MP] as Clmv,
                                            n.[UM MP] as UndMed,
                                            sum(p.PT_UMB) as cant
                                            from HeaderReg h
                                            inner join PosRegProd p on p.HeaderRegId = h.id
                                            inner join tbOrdenProduccion o on o.id = p.OrdenProdId
                                            inner join tbNotificacionAux n on n.PuestoTrabajoid = h.PuestoTrabajoId
                                        where convert(date,h.Fecha,101) = CONVERT(date,${header.Fecha},101) and h.PuestoTrabajoId = ${header.PtrId} 
                                        and h.id not in (select HeaderRegId from PosNotifMFBF where PuestoTrabajoId = ${header.PtrId} 
                                        and  convert(date,HeaderDate,101) = CONVERT(date,${header.Fecha},101)  )
                                        group by o.Material, n.Centro, n.[Almacen MP], n.[CIMv MP], n.[UM MP], h.Id
                                        union all
                                        select  id,
                                            HeaderId as hid,
                                            HeaderId,
                                            Material,
                                            Centro as centro,
                                            Almacen as almacen,
                                            Batch as batch,
                                            Clmv, 
                                            UndMed,
                                            Cant as cant
                                            from PosNotifMFBF
                                              where PuestoTrabajoId = ${header.PtrId} and  convert(date,HeaderDate,101) = CONVERT(date,${header.Fecha},101)`
      callback(null, result)
    } catch (error) {
      callback(error, null)
    }
  }
//Recepcion de materiales
async GetEntradaGrupo(callback){
  try {
    await sql.connect(this.setting)
    const search = await sql.query`select * from tbEntradaGrupo`

    callback(null, search)
  } catch (e) {
    callback(e, null)
  }
}
async GetMateriales(Material, callback) {
  try {
    await sql.connect(this.setting);
    const request = new sql.Request()
    request.input('Material', sql.NVarChar, Material)

    request.execute('Sp_GetMaterialLike', (err, result) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, result)
      }
    })

  } catch (err) {
    callback(err, null);
  }
}
async GetSuplidores(GrupoId, callback) {
  try {
    await sql.connect(this.setting)
    const search = await sql.query`select * from strSuplidores where PuestoTrId in ( select PuestoTrId from strEntradaGrupo where EntradaGrupoId=${GrupoId} ) `

    callback(null, search)
  } catch (e) {
    callback(e, null)
  }
}
async InsertRecepcionHeader(header, callback) {
  try {
    await sql.connect(this.setting);
    const search = await sql.query`select count(*) as existe from HeaderRecepcion  
                                              where Estado ='A' and TurnoId = ${header.TurnoId} 
                                                    and convert(date,Fecha,101) = convert(date,${header.Fecha},101)
                                                    and OperadorId = ${header.Operador} and strEntradaId = ${header.StrEntrada}`;
    if (search.recordset[0].existe == 0) {
      await sql.query`insert into HeaderRecepcion 
                                              (Fecha, TurnoId, OperadorId, strEntradaId, Estado, UsrReg, RegDate, UpdDate)
                                              values (${header.Fecha}, ${header.TurnoId}, 
                                                  ${header.Operador}, ${header.StrEntrada},
                                                  'A', ${header.UsrReg}, Getdate(), Getdate())`;
    }

    const result = await sql.query`select r.Id, r.Fecha, r.TurnoId, 
                                          t.Descripcion as turno, r.OperadorId, r.strEntradaId,
                                          l.Nombres as operador, r.Estado
                                            from HeaderRecepcion r
                                              inner join strListaTurnos t on t.Id = r.TurnoId
                                              inner join loginUsuarios l on l.CodigoEmp = r.OperadorId
                                              where Estado ='A' and TurnoId = ${header.TurnoId} 
                                              and convert(date,Fecha,101) = convert(date,${header.Fecha},101)
                                              and OperadorId = ${header.Operador} and strEntradaId = ${header.StrEntrada}`;
    callback(null, result)
  }
  catch (e) {
    callback(e, null)
  }
}
async GetPosRecepcion(headerRecId, callback) {
  try {
    await sql.connect(this.setting);
    let result = await sql.query`select r.Id, 
                                        r.HeaderRecId, 
                                        r.Material,
                                        m.Descripcion as MaterialDescr,
                                        r.Hora, 
                                        r.Lote, 
                                        r.Peso, 
                                        m.UndBase as unMedida,
                                        r.Suplidor, 
                                        s.Descripcion as nomSuplidor,
                                        r.CantRecibida, 
                                        isNull((select sum(CantRegistrado) from PosRecepcionTrans where PosRecId = r.Id),0) as CantConsumida,
                                        r.CantRecibida - isNull((select sum(CantRegistrado) from PosRecepcionTrans where PosRecId = r.Id),0) as CantRestante,
                                        r.Dim1, 
                                        r.Dim2, 
                                        r.Dim3, 
                                        r.Dim4,
                                        case when (select count(*) from PosRecepcionTrans where PosRecId = r.Id ) > 0 then 0 else r.Id end as transactions
                                        from PosRecepcion r
                                          inner join tbMateriales m on m.Material = r.Material
                                          inner join strSuplidores s on s.Id = r.Suplidor
                                          where r.HeaderRecId = ${headerRecId}`;
    callback(null, result)
  } catch (e) {
    callback(e, null)
  }
}
async InsPosRecepcion(Pos, callback) {
  try {
    await sql.connect(this.setting);
    await sql.query`insert into PosRecepcion (HeaderRecId, Material, Hora, 
                                              Lote, Peso, Suplidor, CantRecibida, Dim1, Dim2, Dim3, Dim4, 
                                              UsrReg, RegDate, UpdDate)
                                          values(${Pos.headerId}, ${Pos.Material}, ${Pos.Hora},
                                              ${Pos.Lote}, ${Pos.Peso}, ${Pos.Suplidor}, ${Pos.Recibida}, 
                                              ${Pos.Dim1}, ${Pos.Dim2}, ${Pos.Dim3}, ${Pos.Dim4},
                                              ${Pos.UsrReg}, GetDate(), GetDate())`

    let result = await sql.query`select r.Id, 
                                        r.HeaderRecId, 
                                        r.Material,
                                        m.Descripcion as MaterialDescr,
                                        r.Hora, 
                                        r.Lote, 
                                        r.Peso, 
                                        m.UndBase as unMedida,
                                        r.Suplidor, 
                                        s.Descripcion as nomSuplidor,
                                        r.CantRecibida, 
                                        isNull((select sum(CantRegistrado) from PosRecepcionTrans where PosRecId = r.Id),0) as CantConsumida,
                                        r.CantRecibida - isNull((select sum(CantRegistrado) from PosRecepcionTrans where PosRecId = r.Id),0) as CantRestante,
                                        r.Dim1, 
                                        r.Dim2, 
                                        r.Dim3, 
                                        r.Dim4,
                                        case when (select count(*) from PosRecepcionTrans where PosRecId = r.Id ) > 0 then 0 else r.Id end as transactions
                                        from PosRecepcion r
                                          inner join tbMateriales m on m.Material = r.Material
                                          inner join strSuplidores s on s.Id = r.Suplidor
                                                where r.HeaderRecId = ${Pos.headerId}`;
    callback(null, result)
    
  } catch (e) {
    callback(e, null)
  }
}
async UpdPosRecepcion(pos, callback) {
  try {
    await sql.connect(this.setting);
      
    request.input('Id', sql.Int, pos.Id)
    request.input('HeaderId', sql.Int, pos.headerId)
    request.input('Material', sql.NVarChar, pos.Material)
    request.input('Hora', sql.DateTime, pos.Hora)
    request.input('Lote', sql.NVarChar, pos.Lote)
    request.input('Peso', sql.Float, pos.Peso)
    request.input('Suplidor', sql.Int, pos.Suplidor)
    request.input('Recibida', sql.Int, pos.Recibida)
    request.input('Dim1', sql.Float, pos.Dim1)
    request.input('Dim2', sql.Float, pos.Dim2)
    request.input('Dim3', sql.Float, pos.Dim3)
    request.input('Dim4', sql.Float, paradadata.Dim4)
    request.input('UsrReg', sql.NVarChar, pos.UsrReg)

    request.execute('Sp_UpdPosRecepcion', (err, result) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, result.recordset)
      }
    })
  } catch (e) {
      callback(e, null)
  }
}
async DelPosRecepcion(PosId, callback) {
  try {
    
    await sql.connect(this.setting);
    let result = await sql.query`delete 
                                        from PosRecepcion 
                                          where Id = ${PosId}`;
    callback(null, result)
  } catch (e) {
    callback(e, null)
  }
}
async GetLoteByMaterial(Material, callback) {
  try {
    await sql.connect(this.setting)
    let result = await sql.query`select p.Lote ,p.CantRecibida - isNull((select sum(CantRegistrado) from PosRecepcionTrans where PosRecId = p.Id and Lote = p.Lote),0) as Restante
                                          from HeaderRecepcion r 
                                              inner join PosRecepcion p on p.HeaderRecId = r.Id
                                              where  r.Estado = 'A' and p.Material = ${Material}`
    callback(null, result)
  } catch (e) {
    callback(e, null)
  }
}
async getPosRecTrans(PosRecId, callback){
  try {
    await sql.connect(this.setting)
    let result = await sql.query`select t.Id
                                      , t.PosRecId
                                      , t.PosRegId
                                      , t.Material
                                      , t.Lote
                                      , t.CantRegistrado
                                      , p.Hora
                                      , l.Nombres  
                                        from PosRecepcion r
                                          inner join PosRecepcionTrans t on t.PosRecId = r.Id
                                          inner join PosRegProd p on p.Id = t.PosRegId
                                          inner join loginUsuarios l on l.CodigoEmp = t.UsrReg
                                          where t.PosRecId = ${PosRecId}`
    callback(null, result)
  } catch (err) {
    callback(err, null)
  }
}

}

module.exports = new Db();
