import React, { useState } from 'react'
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { Add, Pageview, Edit, DeleteForever } from "@material-ui/icons";

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
  
const PosRecepcion = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory()

  const columns = [
    {
      id: "transactions",
      label: "Eliminar",
      minWidth: "100",
      align: "left",
      format: (value) => {
        let m = null
        if(value.toLocaleString() == '0') {
          m = <Button disabled> <DeleteForever/> </Button>
        } else {
          m = <Button data-Id={value.toLocaleString()} onClick={handleDelete}> <DeleteForever/> </Button>
        }
        return m
      },
    },
    {
      id: "Grupo",
      label: "Grupo Entrada",
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
      id: "MaterialDescr",
      label: "Descripcion",
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
      minWidth: "200",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Peso",
      label: "Peso",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "PesoR",
      label: "Consumo Restante",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "unMedida",
      label: "Unidad de Medida",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "nomSuplidor",
      label: "Suplidor",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "CantRecibida",
      label: "Cant Recibida",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "CantCargada",
      label: "Cant Cargada",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "CantRestante",
      label: "Cant Restante",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Dim1",
      label: "Dim1",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Dim2",
      label: "Dim2",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Dim3",
      label: "Dim3",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Dim4",
      label: "Dim4",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    }
    ,{
      id: "Id",
      label: "Transacciones",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleTrans}> <Pageview/> </Button>,
    },{
      id: "Id",
      label: "Edit",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value.toLocaleString()} onClick={handleEdit}> <Edit/> </Button>,
    },
  ]

  let rows = [{
    Id: 1,
    transactions: 0,
    Grupo: 'Laminador 2',
    Material: 'VC003',
    MaterialDescr: 'El nombre del producto',
    Hora: '8:20:00 Am',
    Lote: '31652468',
    Peso: 12.5,
    PesoR: 9.25,
    unMedida: 'KG',
    nomSuplidor: 'Divinopolis',
    CantRecibida: 10,
    CantCargada: 8,
    CantRestante: 2,
    Dim1: 10.2,
    Dim2: 8.5,
    Dim3: 9.25,
    Dim4: 6.22
  },
  {
    Id: 2,
    transactions: 2,
    Grupo: 'Laminador 2',
    Material: 'VC015',
    MaterialDescr: 'El nombre de otro producto',
    Hora: '9:00:00 Am',
    Lote: '31652445',
    Peso: 20.22,
    PesoR: 11.86,
    unMedida: 'KG',
    nomSuplidor: 'Divinopolis',
    CantRecibida: 15,
    CantCargada: 15,
    CantRestante: 0,
    Dim1: 9.2,
    Dim2: 6.21,
    Dim3: 12.3,
    Dim4: 4.21
  }
]

  const handleDelete = (e) => {

  }

  const handleTrans = (e) => {

  }

  const handleEdit = (e) => {

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (
      <Paper className={classes.root}>
        <Link to="/Recepcion/FormPosRecep">
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
          rowsPerPageOptions={[5,10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <ToastContainer />
      </Paper>
    )
}

export default PosRecepcion
