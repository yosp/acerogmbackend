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
import { Check, Toc, Publish, Assignment } from '@material-ui/icons'
import { GlobalContex } from '../../context/GlobalState'

import { regHeaderNotifMfbf, regPosNotifMfbf, getmfbf, getmfbfPos, sapSendMfbf} from '../../context/Api'

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
  const {userInfo, headerNotif, SetActiveNotif, ActivePtr, ActiveFechaN, 
          LoadNotif, LoadNotifPos, notifPos, userRol, setActiveNotifMbffId, setToggleNotifMfbfText } = AceroContex

  const columns = [{
    id: "Material",
    label: "Material",
    minWidth: "175",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "centroPlanif",
    label: "Cantro Planif",
    minWidth: "175",
    align: "left",
    format: (value) => value,
  },
  {
    id: "Centro",
    label: "Centro",
    minWidth: "195",
    align: "left",
    format: (value) => value,
  },
  {
    id: "almacen",
    label: "Almacen",
    minWidth: "175",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "VerFab",
    label: "VerFab",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "PuestoTrabajo",
    label: "Puesto de Trabajo",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Fecha",
    label: "Fecha",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "docdate",
    label: "Fecha Documento",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "UndMedida",
    label: "Unidad Medida",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "CantNot",
    label: "CantNot",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "TextId",
    label: "Text Cab",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value} onClick={handleAddText}> <Assignment/> </Button>,
  }
  ,
  {
    id: "Id",
    label: "Posiciones",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value} onClick={handleViewPos}> <Toc/> </Button>,
  },  
  {
    id: "HeaderId",
    label: "Validar",
    minWidth: "100",
    align: "left",
    format: (value) => { 
          let m = null;
          if(PerfEscr) {
          if(value.toLocaleString() == '0' ){
            m = <Button  disabled > <Check/> </Button>
        } else {
          m = <Button data-Id={value} onClick={handleValidMfbf}> <Check/> </Button>
        } }
        else {
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
        if (PerfEscr) {
        if(value.toLocaleString() == '0') {
          x = <Button disabled > <Publish/> </Button>   
        } else if(parseInt(value) < 0 || value.toLocaleString() == null) {
          x = <Button data-Id={value} onClick={handleSapPublish}> <Publish/> </Button>
        }
        else {
          x = value.toLocaleString()
        }
        return x
      } 
      else {
        if(value.toLocaleString() == '0') {
          x = <Button disabled > <Publish/> </Button>   
        } else if(parseInt(value) < 0 || value.toLocaleString() == null) {
          x = <Button data-Id={value} disabled> <Publish/> </Button>
        }
        else {
          x = value.toLocaleString()
        }
        return x
      }
    },
  },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddText = (e) => {
    e.preventDefault()
    SetActiveNotif(null)
    setActiveNotifMbffId(e.currentTarget.dataset.id)
    setToggleNotifMfbfText(true)
  }

  const handleViewPos = (e) => {
    e.preventDefault()
    SetActiveNotif(e.currentTarget.dataset.id)
  }

  const handleValidMfbf = (e) => {
    e.preventDefault()
    console.log(e.currentTarget.dataset)
    let header = {
      id: e.currentTarget.dataset.id,
      codigo: userInfo[0].CodigoEmp,
      ptr: ActivePtr,
      Fecha: ActiveFechaN
    }

    let predata = {
      PtrId: ActivePtr,
      Fecha: ActiveFechaN,
    };
    regHeaderNotifMfbf(header, (err, data) => {
      if(err) {
        toast.error("Ocurrio un error al intentar validar Cabecera", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
      });
      } else {
        header.hid = header.id
        header.id = data.headerId 
        regPosNotifMfbf(header, (err, data) => {
          if(err) {
            toast.error("Ocurrio un error al intentar validar las posiciones", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000
          });
          } else {
            getmfbf(predata, (err, res)=> {
              if(err) {

              } else {
                LoadNotif(res)
              }
            })
            getmfbfPos(predata, (err, res) => {
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

  const PrependZero = () => {
    let NumZeros = 3
    let ZeroResult = '0'
    for (let i=0; i< NumZeros-1; i++) {
      ZeroResult = `0${ZeroResult}`
    }
    return ZeroResult;
  }

  const handleSapPublish = (e) => {
    e.preventDefault()
    
    let register = headerNotif.filter(head => {
      return head.Id == (parseInt(e.currentTarget.dataset.id)* (-1)) //e.currentTarget.dataset.id
    })

    let pos = notifPos.filter(p => {
      return p.HeaderId == (parseInt(e.currentTarget.dataset.id) * (-1))
    })

    let zeros = PrependZero()

    let dareg = new Date(register[0].Fecha)
    let day = dareg.getDate()
    if(day < 10) {
      day =`0${day}`
    }  

    let Docreg = new Date(register[0].docdate)
    let Dday = Docreg.getDate()
    if(Dday < 10) {
      Dday =`0${Dday}`
    } 

    let HeaderNotif = {
      Materialnr: register[0].Material.trim(),//"EE100",
      Planplant: register[0].centroPlanif,//"1001",
      Prodplant: register[0].Centro,// "1001",
      Storageloc: register[0].almacen,//"0400",
      Prodversion: `${zeros}${register[0].VerFab.trim()}`,//"0001",
      Prodline: register[0].PuestoTrabajo.trim(),//"ESTRGRU",
      Postdate: `${dareg.getFullYear()}-${dareg.getMonth()+1}-${day}`,//"2020-10-08",
      Docdate: `${Docreg.getFullYear()}-${Docreg.getMonth()+1}-${Dday}`,//"2020-10-08",
      Backflquants: register[0].CantNot,//4000.00,
      Textocab: register[0].texto,
      Unidad: register[0].UndMedida.trim() //"KG" 
      
  }

  let MovNotif = []

  pos.forEach(p => {
    let d = {
      Batch: p.Batch,//3163402658,
      EntryQnt: p.cant,//200,
      EntryUom: p.UndMed.trim(),
      Material: p.Material,//"VC083",
      MoveType: p.Clmv,//"261",
      Plant: p.centro,//"1001",
      StgeLoc: p.almacen.trim()//"0450"
  }
  MovNotif.push(d)
  })

  let NotifFinal = ""
  
  let mfbf = {
    Header: HeaderNotif,
    Posiciones: MovNotif,
    NotifFinal
  }
  sapSendMfbf(mfbf, (err, data) => {
    if(err){
      console.log(err)
    } else {
      console.log(data)
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
          reg.Fecha = moment(new Date(reg.Fecha)).format("L");
          reg.docdate = moment(new Date(reg.docdate)).format("L");
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
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
