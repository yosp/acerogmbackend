import React, { useState, useContext, useEffect } from "react";
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
  TablePagination,
  Fab,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import { Add, Pageview, Edit } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import { getApiRegProdComp } from "../../context/Api"
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

const DatosProduccion = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { regproddata, LoadRegCompData, SetNumComp } = aceroContext;
  const history = useHistory()
  const columns = [
    {
      id: "id",
      label: "Cod Reg",
      minWidth: "100",
      align: "left",
      format: (value) => value.toLocaleString(), //toFixed(2),
    },
    {
      id: "Orden",
      label: "Orden Prod",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "mprima",
      label: "Materia Prima",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "lote",
      label: "Lote Mp",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "producto",
      label: "Producto",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Hora",
      label: "Hora",
      minWidth: "200",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Eph",
      label: "EPH",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "ume",
      label: "Consumo Acumulado",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "emb",
      label: "Producción Acumulado",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "comb",
      label: "Combustible",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "conscomb",
      label: "Consumo Combustible",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "conselect",
      label: "Consumo Electricidad",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Notas",
      label: "Observación",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },{
      id: "id",
      label: "",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleGetPrima}> <Pageview/> </Button>,
    },{
      id: "id",
      label: "",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleAddMPrima}> <Edit/> </Button>,
    },
  ]
  
  const handleAddMPrima = (e) => {
    e.preventDefault()
    history.push("/registro/prodcomp")
    SetNumComp(e.currentTarget.dataset.id)
  }

  const handleGetPrima = (e) => {
    e.preventDefault()
    
    SetNumComp(e.currentTarget.dataset.id)
    getApiRegProdComp(e.currentTarget.dataset.id, (err, data) => {
      if(err) {

      }else {
        LoadRegCompData(data)
      }
    })
  }

  useEffect(() => {
    if (regproddata !== null && regproddata !== undefined) {
      regproddata.map((reg) => {
        reg.Hora = moment(new Date(reg.Hora)).format("LT");
        return reg;
      });
      rows = regproddata;
    }
  }, [regproddata]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Link to="/registro/prodreg">
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


export default DatosProduccion;
