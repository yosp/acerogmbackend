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
import moment from "moment";
import { Check, Toc, Publish } from '@material-ui/icons'
import { GlobalContex } from '../../context/GlobalState'
import SapIcon from '../Util/SapIcon'

// import NotifPos from './NotifPos'

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
  const { headerNotif, SetActiveNotif } = AceroContex

  const columns = [
    {
      id: "Orden",
      label: "Orden",
      minWidth: "175",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "operacion",
      label: "Operacion",
      minWidth: "175",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Fecha",
      label: "Fecha",
      minWidth: "195",
      align: "left",
      format: (value) => moment(value.toLocaleString()).format('L'), //value.toLocaleString()
    },
    {
      id: "centro",
      label: "Centro",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "undMendida",
      label: "Und Medida",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "cantNot",
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
      id: "TurnoId",
      label: "Id Turno",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Turno",
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
      id: "hid",
      label: "Posiciones",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleViewPos}> <Toc/> </Button>,
    },  {
      id: "hid",
      label: "Validar",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleViewPos}> <Check/> </Button>,
    },
    {
      id: "hid",
      label: "Enviar A SAP",
      minWidth: "200",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleViewPos}> <Publish/> </Button>,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewPos = (e) => {
    e.preventDefault()
    SetActiveNotif(e.currentTarget.dataset.id)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    if(headerNotif !== null && headerNotif !== undefined){
      headerNotif.map((reg) => {
        reg.Fecha = moment(new Date(reg.Fecha)).format("l");
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
    </Paper>
  );
};

export default HeaderTable;
