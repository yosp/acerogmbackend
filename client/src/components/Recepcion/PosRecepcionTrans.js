import React, { useState, useContext } from 'react'
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
    Fab
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";

const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
    },
    FabStyle: {
      position: "absolute",
      background: "#FFCC00",
      color: "#003366",
      left: "0",
      top: "-1rem",
      zIndex: "999",
      "&:hover": {
        background: "#FFE166",
      },
    },
  }));
let rows = []

const PosRecepcionTrans = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex)
  const { PosRecepcionTrans, setPosRecTrans } = aceroContext
  rows = PosRecepcionTrans
  const columns = [

    {
      id: "Id",
      label: "Id",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Material",
      label: "Material",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Hora",
      label: "Hora",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Lote",
      label: "Lote",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "PesoRegistrado",
      label: "Peso Registrado",
      minWidth: "200",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Nombres",
      label: "Operador",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlerBack = (e) => {
    e.preventDefault()
    setPosRecTrans(null)
  }

    return (
        <Paper className={classes.root}>
          <Fab aria-label="add" className={classes.FabStyle} onClick={handlerBack}>
            <ArrowBackIos />
          </Fab>
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
        </Paper>
    )
}

export default PosRecepcionTrans
