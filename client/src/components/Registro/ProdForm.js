import "moment";
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  makeStyles,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from "../../context/GlobalState";
import { getOdenenComp, insRegProd, getTipoComb, getHeaderReg, GetLoteByMaterial } from "../../context/Api";
import { lang } from "moment";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    overflow: "scroll",
  },
  LogoSize: {
    [theme.breakpoints.down("xs")]: {
      width: "11rem",
      heigth: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "16.5rem",
      heigth: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "22rem",
      heigth: "4rem",
    },
    [theme.breakpoints.up("lg")]: {},
  },
  btnB: {
    background: "#003366",
    color: "white",
    margin: "0 .5em",
    "&:hover": {
      background: "#015CB7",
    },
  },
  btnY: {
    background: "#FFCC00",
    color: "#003366",
    margin: "0 .5em",
    "&:hover": {
      background: "#FFE166",
    },
  },
  SelectStyle: {
    margin: ".5rem 0",
    width: "15rem",
  },
  InputTextStyle: {
    margin: ".5rem 0",
    width: "15rem",
  },
}));

const ProdFrom = () => {
  const classes = useStyle();
  const [hora, setHora] = useState(new Date());
  const [mprima, setMprima] = useState([]);
  const [Lotes, setLote] = useState([])
  const [comb, setComb] = useState([]);
  const [Restante, setRestante] = useState(0)
  const aceroContext = useContext(GlobalContex);
  const { isLam, OrdenPtr, headerReg, user, loadRegProdData, setHeaderRegActive } = aceroContext;
  const history = useHistory();
  let Lam = null;

  const onFormSubmit = (e) => {
    e.preventDefault();

    const {
      orden,
      mprima,
      consacumulado,
      prodacumulado,
      observ,
      mLote,
      combustible,
      conscombustible,
    } = e.target.elements;

    let torden = OrdenPtr.filter((o) => {
      return o.Id == orden.value;
    });
    
    const data = {
      HeaderRegId: headerReg.id,
      OrdenProdId: orden.value,
      Hora: hora,
      MPrima: mprima.value,
      PT_UME: prodacumulado.value,
      PT_UMB: consacumulado.value,
      Notas: observ.value,
      EPH: torden.EPH, 
      Batch: mLote.value,
      TipoCombId: combustible == undefined ? 0 : combustible.value,
      TotalComb: conscombustible == undefined ? 0 : conscombustible.value,
      UsrReg: user.CodigoEmp,
    };
  
    insRegProd(data, (err, res) => {
      if(err){
        toast.error("Error al intentar guardar los registros de producción", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        loadRegProdData(res);
      }
      
    });

    getHeaderReg(headerReg.id, (err, data)=> {
      if(err){
        toast.error("Error al cargar los datos de la cabezera", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
      setHeaderRegActive(data)
      history.push("/registro");
    }
    })
  };

  const HandlerClose = (e) => {
    e.preventDefault();
    history.push("/registro");
  };

  const HandlerMaterial = (e) => {
    e.preventDefault();
    let mtr = mprima.filter(m => {
      return m.Id == e.target.value
    })
    GetLoteByMaterial(mtr[0].Componente, (err, data) => {
      if(err) {
        toast.error("Se produjo un error al cargar los lotes", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setLote(data)
      }
    })
  }

  const handlerLote = (e) => {
    e.preventDefault()
    let lt = Lotes.filter(f => {
      return f.Lote == e.target.value
    })
    setRestante(lt[0].Restante)
  }

  const onChangeOrden = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    let info = label.split('-')[0]
    getOdenenComp(info, (err, data) => {
      if (err) {
        toast.error("Se produjo un error al cargar la materia prima", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setMprima(data);
      }
    });
  };

  const handleDateChange = (date) => {
    setHora(date);
  };

  if (isLam) {
    Lam = (
      <>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <InputLabel id="SCombustible">Combustible</InputLabel>
            <Select
              native
              label="Combustible"
              name="combustible"
              id="Smateria"
              className={classes.SelectStyle}
            >
              <option value="0"></option>
              {comb.map((c) => {
                return (
                  <option key={c.Id} value={c.Id}>
                    {c.Descripcion}
                  </option>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Tooltip title="Solo Números" placement="right">
              <TextField
                id="ConsComb"
                name="conscombustible"
                label="Consumo Combustible"
                type="number"
                className={classes.InputTextStyle}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </>
    );
  }

  useEffect(()=>{
    if (isLam) {
      getTipoComb((err, data) => {
        if (err) {
          toast.error("Se produjo un error al cargar los tipos de combinacion", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else {
          setComb(data);
        }
      });
    }
  },[])

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={10} sm={8} md={6} lg={6}>
          <Paper elevation={3}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.root}
            >
              <form onSubmit={onFormSubmit}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SOrden">Orden Producción</InputLabel>
                    <Select
                      native
                      label="Orden"
                      name="orden"
                      className={classes.SelectStyle}
                      onChange={onChangeOrden}
                    >
                      <option value="0"> </option>
                      {OrdenPtr.map((orden) => {
                        return (
                          <option key={orden.Id} value={orden.Id} >
                            {orden.Orden}-{orden.Material}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="Smateria">Materia Prima</InputLabel>
                    <Select
                      native
                      label="Materia Prima"
                      name="mprima"
                      className={classes.SelectStyle}
                      onChange={HandlerMaterial}
                    >
                      <option value="0"> </option>
                      {mprima.map((prima) => {
                        return (
                          <option key={prima.Id} value={prima.Id} data-Id={prima.Componente}>
                            {prima.Componente} / {prima.Un_Medida}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SLote">Lote</InputLabel>
                    <Select
                      native
                      label="Lote"
                      name="mLote"
                      className={classes.SelectStyle}
                      onChange={handlerLote}
                    >
                      <option value="0"> </option>
                      {Lotes.map((l) => {
                        return (
                          <option key={l.Lote} value={l.Lote} data-Id={l.Restante}>
                            {l.Lote}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip title="Solo Numeros" placement="right">
                    <NumberFormat
                      id="PRestante"
                      name="PRestante"
                      label="Restante"
                      disabled
                      customInput={TextField}
                      type="text"
                      value={Restante}
                      className={classes.InputTextStyle}
                    />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={hora}
                        onChange={handleDateChange}
                        className={classes.InputTextStyle}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip title="Solo Números" placement="right">
                      <TextField
                        id="ConsAcu"
                        name="consacumulado"
                        label="Consumo"
                        type="number"
                        className={classes.InputTextStyle}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip title="Solo Numeros" placement="right">
                    <NumberFormat
                      id="ProdAcu"
                      name="prodacumulado"
                      label="Producción"
                      customInput={TextField}
                      type="text"
                      className={classes.InputTextStyle}
                    />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TextField
                      id="obs"
                      name="observ"
                      label="Observación"
                      multiline
                      rows={2}
                      className={classes.InputTextStyle}
                    />
                  </Grid>
                </Grid>
                {Lam}
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      className={classes.btnB}
                      type="submit"
                    >
                      Aceptar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      className={classes.btnY}
                      type="reset"
                      onClick={HandlerClose}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ProdFrom;
