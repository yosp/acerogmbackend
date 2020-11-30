import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Search } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import MomentUtils from "@date-io/moment";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { getDemoras } from '../../context/Api'

const useStyles = makeStyles((theme) => ({
  PaperSite: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "2rem",
    margin: "2rem",
    height: "4rem",
    [theme.breakpoints.down("xs")]: {
      overflow: "scroll",
    },
    [theme.breakpoints.down("sm")]: {
      overflow: "scroll",
    },
    [theme.breakpoints.up("md")]: {
      overflow: "hiden",
    },
    [theme.breakpoints.up("lg")]: {
      overflow: "hiden",
    },
    [theme.breakpoints.up("xl")]: {
      overflow: "hiden",
    },
  },
  DatePick: {},
  formStyle: {
    padding: "1em 0",
    margin: "1em 0",
  },
  SelectStyle: {
    width: "12em",
  },
  GridContainer: {},
  GridSections: {
    padding: "2rem",
    margin: "2rem",
  },
  GridSideTable: {},
  dividerStyle: {
    margin: ".3rem",
  },

  ButtonSection: {
    bottom: "0",
    left: "39rem",
  },
  btnB: {
    background: "red",
    color: "white",
    margin: "0 .5em",
    marginBottom: "-5rm",
    "&:hover": {
      color: "black",
      background: " #ffcccb",
    },
  },
  buttonSearch: {
    marginTop: "0.2rem",
  },
}));

const SearchDemora = () => {
  const classes = useStyles();
  const [FechaI, SetFechaI] = useState(new Date());
  const [FechaF, SetFechaF] = useState(new Date());
  const [Ptr, setPtr] = useState(2);
  const AceroContex = useContext(GlobalContex);
  const { userInfo, LoadDemora, ActiveDemora } = AceroContex;
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

  
  const handlerSubmit = (e) => {
    e.preventDefault();
    
    const { ptr } = e.target.elements
    const demora = {
      FechaI,
      FechaF,
      PtrId: ptr.value
    }
    getDemoras(demora,(err, res)=> {
      if(err) {
        toast.error("Ocurrio un error al intentar generar la demora", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        LoadDemora(res)
      }
    } )
  };

  const handleFICHange = (date) => {
    SetFechaI(date._d);
  };

  const handleFFCHange = (date) => {
    SetFechaF(date._d);
  };

  useEffect(()=> {
    if(ActiveDemora === null) {
      console.log(Ptr)
      const demora = {
        FechaI,
        FechaF,
        PtrId: Ptr
      }

      getDemoras(demora,(err, res)=> {
        if(err) {
          toast.error("Ocurrio un error al intentar generar la demora", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else {
          LoadDemora(res)
        }
      } )
    }
  },[ActiveDemora])

  return (
    <>
      <Paper elevation={4} className={classes.PaperSite}>
        <form onSubmit={handlerSubmit} className={classes.formStyle}>
          <Grid
            spacing={3}
            container
            justify="flex-start"
            alignContent="space-around"
            wrap="wrap"
            direction="row"
          >
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk
                  name="FechaI"
                  variant="inline"
                  inputVariant="outlined"
                  label="Seleccione Fecha Inicial"
                  format="MM/DD/YYYY"
                  className={classes.DatePick}
                  value={FechaI}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={handleFICHange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk
                  name="FechaF"
                  variant="inline"
                  inputVariant="outlined"
                  label="Seleccione Fecha Final"
                  format="MM/DD/YYYY"
                  className={classes.DatePick}
                  value={FechaF}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={handleFFCHange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="LPt">Puesto de Trabajo</InputLabel>
                <Select
                  id="ptr"
                  name="ptr"
                  native
                  label="Puesto de Trabajo"
                  className={classes.SelectStyle}
                  onChange={(e) => {setPtr(e.target.value)}}
                >
                  {PuestosTr.map((puesto) => {
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
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.buttonSearch}
                startIcon={<Search />}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </>
  );
}

export default SearchDemora;
