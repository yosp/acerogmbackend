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

import { regHeaderNotifMfbf, regPosNotifMfbf, getmfbf, getmfbfPos} from '../../context/Api'

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
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Centro",
    label: "Centro",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
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
    id: "cantnot",
    label: "CantNot",
    minWidth: "195",
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
    id: "HeaderId",
    label: "Validar",
    minWidth: "100",
    align: "left",
    format: (value) =>{ 
          let m = null;
          if(value.toLocaleString() == '0' ){
            m = <Button  disabled > <Check/> </Button>
        } else {
          m = <Button  data-Id={value.toLocaleString()} onClick={handleValidMfbf}> <Check/> </Button>
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
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewPos = (e) => {
    e.preventDefault()
    SetActiveNotif(e.currentTarget.dataset.id)
  }

  const handleValidMfbf = (e) => {
    e.preventDefault()
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

  const handleSapPublish = (e) => {
    e.preventDefault()
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    if(headerNotif !== null && headerNotif !== undefined){
      headerNotif.map((reg) => {
          reg.Fecha = moment(new Date(reg.Fecha)).format("L");
          reg.docdate = moment(new Date(reg.docdate)).format("L");
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
