import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { Check, Toc, Publish } from '@material-ui/icons'
import { GlobalContex } from '../../context/GlobalState'

import { regHeaderNotif, regPosNotif, getNotif, getNotifPos, sapSendCo11, NotifSap} from '../../context/Api'

let rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  FabStyle: {
    position: "absolute",
    background: "#FFCC00",
    color: "#003366",
    right: "0",
    top: "-4rem",
    zIndex: "999",
    "&:hover": {
      background: "#FFE166",
    },
  },
}));

const HeaderTable = () => {
  const classes = useStyles();
  const [PerfLeer, setPerfLeer] = useState(false)
  const [PerfEscr, setPerfEscr] = useState(false)
  const [PerfBorr, setPerfBorr] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const AceroContex = useContext(GlobalContex)
  const {userInfo, headerNotif, SetActiveNotif, notifPos, ActivePtr, ActiveFechaN, LoadNotif, LoadNotifPos, userRol } = AceroContex

  const columns = [
    {
      id: "Orden",
      label: "Orden",
      minWidth: "175",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Operacion",
      label: "Operacion",
      minWidth: "175",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "FechaCount",
      label: "Fecha",
      minWidth: "195",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Centro",
      label: "Centro",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "UndMedida",
      label: "Und Medida",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "CantNot",
      label: "CantNot",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "HoraMaquina",
      label: "Hora Maquina",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "UndHM",
      label: "Und HM",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "HoraHombre",
      label: "Hora Hombre",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "UnHH",
      label: "Und HH",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Turno",
      label: "Id Turno",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "TurnoDesc",
      label: "Turno",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "UnTurno",
      label: "Seccion",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Id",
      label: "Posiciones",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value} onClick={handleViewPos}> <Toc/> </Button>,
    },  
    {
      id: "hid",
      label: "Validar",
      minWidth: "100",
      align: "left",
      format: (value) =>{ 
            let m = null;
            if(PerfEscr){
              if(value.toLocaleString() == '0'){
                m = <Button  disabled > <Check/> </Button>
              } else {
                m = <Button  data-Id={value} onClick={handleValid}> <Check/> </Button>
              } 
            } else {
              m = <Button  disabled > <Check/> </Button>
          }
          return m},
    },
    {
      id: "RegSap",
      label: "Registro SAP",
      minWidth: "200",
      align: "left",
      format: (value) => {
        let x 
        if(PerfEscr){
          if(value.toLocaleString() == '0') {
            x = <Button disabled > <Publish/> </Button>   
          } else if(parseInt(value) < 0 || value == null) {
            x = <Button data-Id={value} onClick={handleSapPublish}> <Publish/> </Button>
          }
          else {
            x = value.toLocaleString()
          } 
        } else {
          if(value.toLocaleString() == '0') {
            x = <Button disabled > <Publish/> </Button>   
          } else if(parseInt(value) < 0 || value == null) {
            x = <Button disabled> <Publish/> </Button>
          }
          else {
            x = value.toLocaleString()
          }
        }
        return x
      },
    },
  ];

  const PrependZero = (value) => {
    let NumZeros = 12 - value
    let ZeroResult = '0'
    if(value === 12) {
      return ''
    } else {
      for (let i=0; i< NumZeros-1; i++) {
        console.log(0)
        ZeroResult = `${ZeroResult}`
      }
      return ZeroResult;
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewPos = (e) => {
    e.preventDefault()
    SetActiveNotif(e.currentTarget.dataset.id)
  }
  const handleValid = (e) => {
    e.preventDefault()
    let header = {
      id: e.currentTarget.dataset.id,
      codigo: userInfo[0].CodigoEmp,
      ptr: ActivePtr
    }

    let predata = {
      PtrId: ActivePtr,
      Fecha: ActiveFechaN,
    };
    regHeaderNotif(header, (err, data) => {
      if(err) {
        toast.error("Ocurrio un error al intentar validar Cabecera", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
      });
      } else {
        predata.headerId = data.headerId
        regPosNotif(predata, (err, data) => {
          if(err) {
            toast.error("Ocurrio un error al intentar validar las posiciones", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000
          });
          } else {
            getNotif(predata, (err, res)=> {
              if(err) {

              } else {
                LoadNotif(res)
              }
            })
            getNotifPos(predata, (err, res) => {
              if(err){

              }else{
                LoadNotifPos(res)
                SetActiveNotif(null)
              }
            })
            
            toast.success("Posiciones de notificacion validadas", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000
          });
          }
        })

        toast.success("Cabecera de notificacion validada", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
      });
      }
    })
  }
  const handleSapPublish = (e) => {
    e.preventDefault()
    const ElId = (parseInt(e.currentTarget.dataset.id) * (-1))
    let register = headerNotif.filter(head => {
      return head.Id == (parseInt(e.currentTarget.dataset.id)* (-1)) //e.currentTarget.dataset.id
    })
    
    let pos = notifPos.filter(p => {
      return p.hid == (parseInt(e.currentTarget.dataset.id) * (-1))
    })
    
    let zeros = PrependZero(register[0].Orden.length)
    
    let dareg = new Date(register[0].FechaCount)
    let day = dareg.getDate()
    if(day < 10) {
      day =`0${day}`
    }  

    let Movimientos = []

    let sHeaderNotif = {
      ConfActiUnit1: register[0].UndHM, //'STD',
      ConfActiUnit2: register[0].UnHH, //'STD',
      ConfActiUnit3: register[0].UnTurno, //'SHF',
      ConfActivity1: register[0].HoraMaquina, //8,
      ConfActivity2: register[0].HoraHombre, //6.5,
      ConfActivity3: register[0].Turno , //1,
      ConfQuanUnit: register[0].UndMedida, //'AT',
      Operation: register[0].Operacion.trim(), //'0010',
      Orderid: `${zeros}${register[0].Orden}`, //'000000294659',
      Plant: register[0].Centro, //'1001',
      PostgDate: `${dareg.getFullYear()}-${dareg.getMonth()+1}-${day}`, //'2020-10-15',
      YieldCant: register[0].CantNot,//1,
  }
      pos.forEach(p => {
          Movimientos.push({
            Batch: p.Batch,//3163402659,
            EntryQnt: p.cant,//1,
            EntryUom: p.UndMed.trim(),
            Material: p.Material,//"CPC-001",
            MoveType: p.Clmv,//"261",
            Plant: p.centro,//"1001",
            StgeLoc: p.almacen.trim()//"0400"
        })
    })

    let Co11 = {
      Header: sHeaderNotif,
      Posiciones: Movimientos,
      NotifFinal : ''
    }

    sapSendCo11(Co11, (err, data) =>{
      if(err){
        console.error(err);
      } else {
        NotifSap({Confirm: data.confNoField, IdNotif: ElId }, (err, res)=> {
          if(err){

          } else {
            LoadNotif(res)
          }
        }) 
      }
    })
    
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    let perf = userRol.filter(f => {
      return f.rol == "Notificación"
    })
    perf.forEach(p => {
      if(p.IdPerfil === 1) {
        setPerfEscr(true)
      } 

      if(p.IdPerfil === 2) {
        setPerfLeer(true)
      } 

      if(p.IdPerfil === 3) {
        setPerfBorr(true)
      } 
    })
  },[])
  useEffect(()=>{
    if(headerNotif !== null && headerNotif !== undefined){
      headerNotif.map((reg) => {
          reg.FechaCount = moment(new Date(reg.FechaCount)).format("L");
        return reg;
      });
      rows = headerNotif
      if(rowsPerPage == 5) {
        setRowsPerPage(10)
      } else {
        setRowsPerPage(5)
      }
    }
    return function cleanet() {
      rows = []
      if(rowsPerPage == 5) {
        setRowsPerPage(10)
      } else {
        setRowsPerPage(5)
      }
    }
  

  },[headerNotif])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  id={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </Paper>
  );
};

export default HeaderTable;
