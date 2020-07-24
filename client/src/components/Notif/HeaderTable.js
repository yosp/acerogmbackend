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
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import { Check, Toc, Publish } from '@material-ui/icons'
import { GlobalContex } from '../../context/GlobalState'

import { regHeaderNotif, regPosNotif, getNotif, getNotifPos} from '../../context/Api'

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const AceroContex = useContext(GlobalContex)
  const {userInfo, headerNotif, SetActiveNotif, ActivePtr, ActiveFechaN, LoadNotif, LoadNotifPos } = AceroContex

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
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleViewPos}> <Toc/> </Button>,
    },  
    {
      id: "hid",
      label: "Validar",
      minWidth: "100",
      align: "left",
      format: (value) =>{ 
            let m = null;
            if(value.toLocaleString() == '0'){
              m = <Button  disabled > <Check/> </Button>
          } else {
            m = <Button  data-Id={value.toLocaleString()} onClick={handleValid}> <Check/> </Button>
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
        if(value.toLocaleString() == '0' || value.toLocaleString() == null) {
          x = <Button data-Id={value.toLocaleString()} onClick={handleSapPublish}> <Publish/> </Button>
        } else {
          x = value.toLocaleString()
        }
        return x
      },
    },
  ];

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
        regPosNotif({id:header.id, headerId: data.headerId }, (err, data) => {
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
    console.log(e.currentTarget.dataset.id)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    if(headerNotif !== null && headerNotif !== undefined){
      headerNotif.map((reg) => {
          reg.FechaCount = moment(new Date(reg.FechaCount)).format("L");
        return reg;
      });
      rows = headerNotif
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
        rowsPerPageOptions={[10, 25, 50, 100]}
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
