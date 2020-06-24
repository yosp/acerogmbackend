import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { GlobalContex } from "../../context/GlobalState";
import moment from "moment";
const columns = [
  {
    id: "HoraInicio",
    label: "Hora Inicio",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "HoraFin",
    label: "Hora Fin",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Tiempo",
    label: "Tiempo Parada",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "TiempoStandard",
    label: "Tiempo Programado",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "cargo",
    label: "Cargo",
    minWidth: "200",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "area_falla",
    label: "Area Parada",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Equipo",
    label: "Equipo Parada",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "CausaFalla",
    label: "Causa Parada",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "MP_Perd",
    label: "PLQ Perdidas",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "MP_Desc",
    label: "PLQ Descartado",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Orden",
    label: "Orden Producción",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Material",
    label: "Producto",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Perfil",
    label: "Seccion",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "ComentarioDemora",
    label: "Observacion",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "gatillo",
    label: "Gatillo",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "EstadoTF",
    label: "Realizar TF",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Nota",
    label: "Comentario Demora",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
];

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
const DataDemora = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const AceroContex = useContext(GlobalContex);
  const { regDemora } = AceroContex;

  useEffect(()=>{
    if(regDemora != null && regDemora !== undefined) {
      regDemora.map((reg) => {
        reg.HoraInicio = moment(new Date(reg.HoraInicio)).format("LT");
        reg.HoraFin = moment(new Date(reg.HoraFin)).format("LT");
        return reg;
      });
      console.log("demora row")
      rows = regDemora
    }
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

export default DataDemora;
