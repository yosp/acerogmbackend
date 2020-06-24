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
} from "@material-ui/core";
import { GlobalContex } from "../../context/GlobalState";

const columns = [
  {
    id: "id",
    label: "Cod Reg",
    minWidth: "100",
    align: "left",
    format: (value) => value.toLocaleString(), //toFixed(2),
  },
  {
    id: "CodComponentes",
    label: "Componentes",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Descripcion",
    label: "Descripcion",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Batch",
    label: "Lote",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "MpUme",
    label: "Consumo Acumulado",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "MpFactor",
    label: "Factor",
    minWidth: "200",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "MpUmb",
    label: "UMB",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
]

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

const DataCompPanel = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { } = aceroContext;
  
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

export default DataCompPanel;
