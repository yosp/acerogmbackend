import "moment";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles, 
          Paper, 
          Grid, 
          TextField, 
          Button,
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableHead,
          TableRow,
          TablePagination
        } from "@material-ui/core";
import { Search, Pageview } from "@material-ui/icons";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from "../../context/GlobalState";
import { getOrdenList, getOrdenCompList } from "../../context/Api"

import NavigationBar from "../Util/NavBar";
import Componentes from './Componentes'
import LogoutPopup from '../Util/LogoutPopup'
import AddComponent from './AddComponent'

const useStyles = makeStyles(theme => ({
  rootContainer: {},
  SearchPaper: {
    margin: "1rem 0 .5rem 0",
    padding: '.5rem',
    width: "50rem"
  },
  SearchImput: {
    width: "20rem"
  },
  SearchButton: {
    margin: '.5rem .5rem',
    background: '#FFCC00',
    color: "#003366",
    '&:hover': {
      background: "#FFE166"
    }
  },
  ResultPaper: {
    margin: '.5rem',
    padding: '0.5rem',
    width: '80rem'
  }
}));
let rows = [];
const OrdenProduccion = () => {
  const classes = useStyles();
  const [FechaInicio, setFechaInicio] = useState(new Date());
  const [FechaFin, setFechaFin] = useState(new Date());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ActiveId, SetActiveId] = useState(0)
  const aceroContext = useContext(GlobalContex);
  const { OrdenList, setOrdenList, setOrdenCompList } = aceroContext


  const columns = [
    {
      id: 'Id',
      label: "id",
      minWidth: "100",
      align: 'left',
      format: value => value.toLocaleString() //toFixed(2),
    },
    {
      id: 'Orden',
      label: "Orden",
      minWidth: "100",
      align: 'left',
      format: value => value.toLocaleString() //toFixed(2),
    },
    {
      id: 'Material',
      label: "Material",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'Centro',
      label: "Centro",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'EPH',
      label: "EPH",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'Prog',
      label: "Prog",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString(),
    },
    {
      id: 'UndMedida',
      label: "Und Medida",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'FechaIn',
      label: "Fecha Inicio",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'FechaFn',
      label: "Fecha Fin",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'HojaRuta',
      label: "Hoja Ruta",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: 'NumOperacion',
      label: "Num Operacion",
      minWidth: "170",
      align: 'center',
      format: value => value.toLocaleString()
    },
    {
      id: 'CantBase',
      label: "Cant Base",
      minWidth: "170",
      align: 'center',
      format: value => value.toLocaleString()
    },
    {
      id: 'Valor prefijado',
      label: "Valor prefijado",
      minWidth: "170",
      align: 'center',
      format: value => value.toLocaleString()
    },
    {
      id: 'VerFab',
      label: "Ver Fab",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    }
    ,{
      id: 'PuestoTrabajo',
      label: "Puesto Trabajo",
      minWidth: "170",
      align: 'left',
      format: value => value.toLocaleString()
    },
    {
      id: "Id",
      label: "Componentes",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value} onClick={handlerViewComp}> <Pageview/> </Button>,
    }
  ];

  useEffect(() => {
    if(OrdenList != null || OrdenList != undefined) {
      OrdenList.map(ord => {
        ord.FechaIn = moment(ord.FechaInicio).format("L");
        ord.FechaFn = moment(ord.FechaFin).format("L");
      })
      rows = OrdenList
      if(rowsPerPage == 5) {
        setRowsPerPage(10)
      } else {
        setRowsPerPage(5)
      }
    }
    
  },[OrdenList])

  const handleFInicioChange = (date) => {
    setFechaInicio(date._d);
  };

  const handlerViewComp  =(e) => {
    e.preventDefault()
    SetActiveId(e.currentTarget.dataset.id)
    getOrdenCompList(e.currentTarget.dataset.id, (err, data)=> {
      if(err){
        toast.error("Error al intentar obtener los componentes de la orden", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setOrdenCompList(data)
      }
    })

  }

  const handleHFinChange = (date) => {
    setFechaFin(date._d);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onFormSubmit = e => {
    e.preventDefault()
    
    let fI = new Date(FechaInicio)
    let ff = new Date(FechaFin)

    let fidate = `${fI.getMonth()+1}/${fI.getDate()}/${fI.getFullYear()}`
    let ffdate = `${ff.getMonth()+1}/${ff.getDate()}/${ff.getFullYear()}`

    let data = {
      FechaI: fidate,
      FechaF: ffdate
    }
    
    getOrdenList(data, (err, res) => {
      if(err) {
          toast.error("Error al intentar obtener las ordenes", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
      } else {
        
        setOrdenList(res)
      }
    })
    
  }

  return (
    <Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <NavigationBar />
        <form onSubmit={onFormSubmit}>
          <Paper elevation={3} className={classes.SearchPaper}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker 
                    margin="normal"
                    id="time-picker"
                    label="Fecha Inicio"
                    value={FechaInicio}
                    format="DD/MM/YYYY"
                    onChange={handleFInicioChange}
                    className={classes.InputTextStyle}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker 
                      margin="normal"
                      id="time-picker"
                      label="Fecha Fin"
                      value={FechaFin}
                      format="DD/MM/YYYY"
                      onChange={handleHFinChange}
                      className={classes.InputTextStyle}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="default"
                  type="submit"
                  className={classes.SearchButton}
                  startIcon={<Search />}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Paper>
          </form>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper elevation={3} className={classes.ResultPaper}>
          <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} id={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
      </Grid>
      <Componentes/>
      <ToastContainer/>
      <LogoutPopup/>
      <AddComponent/>
    </Grid>
  );
};

export default OrdenProduccion;
