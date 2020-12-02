import "moment";
import React, { useContext } from "react";
import {
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Button
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContex } from '../../context/GlobalState'
import { InsertHeaderRegistro, getApiOrdeneByPtr } from '../../context/Api'


const useStyle = makeStyles(theme => ({

  formControl: {
    minWidth: 120
  },
  formStyle: {
    padding: "1em 0",
    margin: "1em 0"
  },
  GridMain: {
    margin: "2.5em",
    paddin: "1em"
  },
  PtContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "1px solid lightgray",
    margin: "2em 1em",
    padding: ".5em .2em",
    width: "30em"
  },
  grupoContainer: {
    margin: "1em 0"
  },
  PaperStyle: {
    padding: "1em"
  },
  SelectStyle: {
    width: "12em"
  },
  DatePick: {
    margin: ".8em 0",
    width: "12em"
  },
  ButtonSection: {
    margin: ".5em 0 0 -.5em"
  },
  btnB: {
    background: "#003366",
    color: "white",
    margin: "0 .5em",
    '&:hover':{
      background: "#015CB7"
    }
  },
  
  btnY: {
    background: "#FFCC00",
    color: "#003366",
    margin: "0 .5em",
    '&:hover':{
      background: "#FFE166"
    }
  }
}));

const PuestoTr = () => {
  const classes = useStyle();
  const AceroContex = useContext(GlobalContex) 
  const { userInfo, turnos, grupos, user, setHeaderRegActive, setOrdenPtr } = AceroContex
  const [TodayDate, setTodayDate] = React.useState(new Date());
  const puestos = userInfo.map((puesto) => {
    return {
      id: puesto.PuestoTrId,
      Descrit: puesto.PuestoTr,
      TypeNot: puesto.TipoNotif,
    };
  });
  const PuestosTr = Array.from(new Set(puestos.map((a) => a.id))).map(
    (id) => {
      return puestos.find((a) => a.id === id);
    }
  );
  let listaGrupos = null
  let grp = grupos.map(grupo => {
      return { id: grupo.Id, grupo: grupo.grupo }
  })

    grp = [... new Set(grp)]
    

  const eliminarObjetosDuplicados = (arr, prop) => {
        var nuevoArray = [];
        var lookup = {};

        for (var i in arr) {
            lookup[arr[i][prop]] = arr[i];
        }

        for (i in lookup) {
            nuevoArray.push(lookup[i]);
        }

        return nuevoArray;
    }

  listaGrupos = eliminarObjetosDuplicados(grp, "id")

  const handlerSubmit = event => {
    event.preventDefault();
      const { Ptr, Fecha, Grupo, Turno } = event.target.elements

      const data = {
          Fecha: new Date(Fecha.value),
          GrupoId: parseInt(Grupo.value),
          TurnoId: parseInt(Turno.value),
          PuestoTrabajoId: parseInt(Ptr.value),
          Estatus: 'A',
          UsrReg: user.CodigoEmp,
          RegDate: new Date()
      }
      
      InsertHeaderRegistro(data, (err, res) => {
          if(err){
            toast.error("No es posible realizar la busqueda", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            console.error(err)
          } else {
            getApiOrdeneByPtr(parseInt(Ptr.value), (err, data) => {
              if(err) {

              } else {
                setOrdenPtr(data)
              }
            })
            setHeaderRegActive(res)
          }
          
          
      })

  };

  const handleDateChange = date => {
    setTodayDate(date);
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        direction="column"
        wrap="nowrap"
        className={classes.GridMain}
      >
        <Paper elevation={3} className={classes.PtContainer}>
          <form onSubmit={handlerSubmit} className={classes.formStyle}>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="LPt">Puesto de Trabajo</InputLabel>
                <Select
                  name="Ptr"
                  native
                  label="Puesto de Trabajo"
                  className={classes.SelectStyle}
                >
                  {PuestosTr.map(puesto => {
                    return (
                      <option
                        key={puesto.Descrit}
                        value={puesto.id}
                        data-type={puesto.TypeNot}
                      >
                        {puesto.Descrit}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk
                  name="Fecha"
                  variant="inline"
                  inputVariant="outlined"
                  label="Seleccione Fecha"
                  format="MM/DD/YYYY"
                  className={classes.DatePick}
                  value={TodayDate}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="Lturno">Turnos</InputLabel>
                <Select
                  native
                  name="Turno"
                  label="Turnos"
                  id="Sturno"
                  className={classes.SelectStyle}
                >
                  {turnos.map(turno => {
                    return (
                      <option key={turno.id} value={turno.Id}>
                          {turno.Descripcion}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl
                variant="outlined"
                className={classes.grupoContainer}
              >
                <InputLabel id="LGrupo">Grupos</InputLabel>
                <Select
                  native
                  name="Grupo"
                  label="Grupos"
                  id="SGrupo"
                  className={classes.SelectStyle}
                >
                  <option value="0">
                    {" "}
                  </option>
                    {listaGrupos.map(grupo => {
                    return (
                      <option key={grupo.id} value={grupo.id}>
                        {grupo.grupo}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.ButtonSection}>
              <Button type="submit" className={classes.btnB}>
                Aceptar
              </Button>
              <Button type="reset" className={classes.btnY}>
                Cancelar
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default PuestoTr;

