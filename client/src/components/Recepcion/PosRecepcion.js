import React, { useState, useEffect, useContext } from 'react'
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
import { GlobalContex } from "../../context/GlobalState";
import { DelPosRecepcion, GetPosRecepcion, GetPosRecTrans } from "../../context/Api"

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
let rows = []

const PosRecepcion = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex)
  const { PosRecepcion, RecepcionHeader, setPosRecepcion, setPosRecTrans } = aceroContext
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
          m = <Button data-Id={value} onClick={handleDelete}> <DeleteForever/> </Button>
        }
        return m
      },
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
      id: "Hora2",
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
      id: "CantConsumida",
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
      format: (value) => <Button data-Id={value} onClick={handleTrans}> <Pageview/> </Button>,
    },
  ]
useEffect(()=>{
  if(PosRecepcion != null || PosRecepcion != undefined){ 
    PosRecepcion.forEach(p => {
      p.Hora2 = moment(p.Hora).format('LT')
      p.unMedida = p.unMedida.trim()
      return p 
    })
    rows = PosRecepcion
    
    if(rowsPerPage == 5) {
      setRowsPerPage(10)
    } else {
      setRowsPerPage(5)
    }
  }
  
},[PosRecepcion])

  const handleDelete = (e) => {
    DelPosRecepcion(e.currentTarget.dataset.id, (err, data)=>{
      if(err) {
        toast.error("Error al intentar eliminar el registro", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }else {
        GetPosRecepcion(RecepcionHeader.Id, (err, res) => {
          if(err) {
            toast.error("Error al intentar cargar los datos de las recepciones", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            setPosRecepcion(res)
          }
        })
      }
    })
  }
  const handleTrans = (e) => {
    e.preventDefault()
    GetPosRecTrans(e.currentTarget.dataset.id, (err, data)=> {
      if(err) {

      } else {
        data.forEach(e => {
          e.Hora = moment(e.Hora).format('L'); 
          return e
        })
        setPosRecTrans(data)
      }
    })
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
