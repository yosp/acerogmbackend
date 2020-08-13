import React, { useState, useContext, useEffect } from "react";
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
  Fab,
} from "@material-ui/core";
import moment from "moment";
import { Link } from 'react-router-dom'
import { Add } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import { getMotivoFallaArea } from "../../context/Api";
import { red } from "@material-ui/core/colors";

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
    MainModal: {
      overflow: "scroll",
      background: red,
      [theme.breakpoints.down("xs")]: {
        heigth: "50em",
      },
      [theme.breakpoints.down("sm")]: {
        heigth: "60em",
      },
      [theme.breakpoints.up("md")]: {
        heigth: "70em",
      },
      [theme.breakpoints.up("lg")]: {},
    },
  },
}));

let rows = [];

const DatosParada = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const AceroContext = useContext(GlobalContex);
  
  const {
    regparaddata,
    fallaAreas,
    LoadFallaArea,
    headerReg,
  } = AceroContext;

  
const columns = [
  {
    id: "idreg",
    label: "Id",
    minWidth: "100",
    align: "left",
    format: (value) => value.toLocaleString(), //toFixed(2),
  },
  {
    id: "horaIn",
    label: "Hora Inicio",
    minWidth: "200",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "horaFn",
    label: "Hora Fin",
    minWidth: "200",
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
    id: "tprogramado",
    label: "Tiempo Programado",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "cargo",
    label: "Cargo",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "area",
    label: "Area",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "equipo",
    label: "Equipo",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "causa",
    label: "Causa",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "plqp",
    label: "PLQ Perdidas",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "plqd",
    label: "PLQ Descartados",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "ordennp",
    label: "Orden Producción",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "prod",
    label: "Producto",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "proda",
    label: "Producto Anterior",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Notas",
    label: "Observaciones",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
];
  useEffect(() => {
    if (regparaddata !== null && regparaddata !== undefined) {
      console.log(regparaddata)
      regparaddata.map((reg) => {
        reg.horaIn = moment(new Date(reg.horaI)).format("LT");
        reg.horaFn = moment(new Date(reg.horaF)).format("LT");
        return reg;
      });
      rows = regparaddata;

    }

    if (fallaAreas === null || fallaAreas === undefined) {
      getMotivoFallaArea(headerReg.PuestoTrabajoId, (err, data) => {
        if (err) {
        } else {
          LoadFallaArea(data);
        }
      });
    }
    setRowsPerPage(25);
  }, [regparaddata]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Link to="/registro/paradreg">
        <Fab aria-label="add" className={classes.FabStyle}>
          <Add />
        </Fab>
      </Link>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.idreg}>
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
        rowsPerPageOptions={[10, 25, 100]}
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

export default DatosParada;
