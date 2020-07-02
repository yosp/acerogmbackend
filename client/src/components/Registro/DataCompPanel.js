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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  ArrowBackIosRounded,
  Delete
} from '@material-ui/icons'
import { GlobalContex } from "../../context/GlobalState";
import { DelProdComp, getApiRegProdComp } from '../../context/Api'
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
  const history = useHistory();
  const aceroContext = useContext(GlobalContex);
  const { regprodcompdata, ClearRegComp, LoadRegCompData, compNumber } = aceroContext;
  
  const columns = [
    {
      id: "Id",
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
      id: "MP_UME",
      label: "Consumo Acumulado",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "MP_Factor",
      label: "Factor",
      minWidth: "200",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "MP_UMB",
      label: "UMB",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },{
      id: "Id",
      label: "Borrar",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handlerDeletePrima}> <Delete/> </Button>,
    }
  ]
  
  useEffect(()=> {
    if(regprodcompdata != null) {
      rows = regprodcompdata
    }
  },[regprodcompdata])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlerDeletePrima = (e) => {
    e.preventDefault();
    DelProdComp(e.currentTarget.dataset.id, (err, res) => {
      if(err) {

      } else {
        getApiRegProdComp(compNumber, (err, data) => {
          LoadRegCompData(data)
        })
      }
    })
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HandlerClose = (e) => {
    e.preventDefault();
    ClearRegComp()
  };

  return (
    <Paper className={classes.root}>
      <div><Button onClick={HandlerClose}><ArrowBackIosRounded/></Button></div>
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
