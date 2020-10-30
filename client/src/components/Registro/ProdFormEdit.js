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
import { getOdenenComp, updPosRegProd, getTipoComb, getHeaderReg, GetLoteByMaterial } from "../../context/Api";

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

const ProdFormEdit = () => {
  const classes = useStyle();
  const [oldH, setOldH] = useState('')
  const [hora, setHora] = useState(new Date());
  const [mprima, setMprima] = useState([]);
  const [Lotes, setLote] = useState([])
  const [Slote, setSlote] = useState('')
  const [Restante, setRestante] = useState(0)
  const [comb, setComb] = useState([]);
  const [ord, setOrd] = useState('')
  const [prima, SetPrima] = useState('')
  const [consAc, SetConsAc] = useState(0)
  const [proAc, SetProAc] = useState(0)
  const [notas, SetNotas] = useState('')
  const [combs, SetCombs] = useState(0)
  const [consComb, SetConsComb] = useState(0)
  const [RegId, SetRegId] = useState(0)

  const aceroContext = useContext(GlobalContex);
  const { isLam, ordenes, headerReg, user, loadRegProdData, setHeaderRegActive, activeproddata } = aceroContext;
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

    let torden = ordenes.filter((o) => {
      return o.Id == orden.value;
    })[0];

    const data = {
      Id: RegId,
      HeaderRegId: headerReg.id,
      OrdenProdId: parseInt(orden.value),
      Hora: hora,
      OldH: oldH,
      MPrima: parseInt(mprima.value),
      PT_UME: parseInt(consacumulado.value),
      PT_UMB: parseFloat(prodacumulado.value),
      Notas: observ.value,
      EPH: torden.EPH,
      Batch: mLote.value, 
      TipoCombId: combustible == undefined ? 0 : parseInt(combustible.value),
      TotalComb: conscombustible == undefined ? 0 : parseInt(conscombustible.value),
      UsrReg: user.CodigoEmp,
    };

    updPosRegProd(data, (err, res) => {
      if(err) {
        toast.error("Error al intentar acctualizar los registros de producción", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        console.error(err)
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
  const onChangeOrden = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;

    setOrd(e.target.value)
    getOdenenComp(label, (err, data) => {
      if (err) {
        toast.error("Se produjo un error al cargar la materia prima", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setMprima(data);
      }
    });
  };

  
  const HandlerMaterial = (e) => {
    e.preventDefault();
    
    SetPrima(e.target.value)
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
    setSlote(e.target.value)
    let lt = Lotes.filter(f => {
      return f.Lote == e.target.value
    })
    console.log(lt)
    setRestante(lt[0].Restante)
  }

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
              value={combs}
              onChange={(e) => SetCombs(e.target.value)}
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
                value={consComb}
                onChange={e=> SetConsComb(e.target.value)}
                className={classes.InputTextStyle}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </>
    );
  }

  useEffect(()=>{
    setHora(activeproddata.Hora)
    setOldH(activeproddata.Hora)
    getOdenenComp(activeproddata.Orden, (err, data) => {
      if (err) {
        toast.error("Se produjo un error al cargar los tipos de combinacion", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setMprima(data);
        SetRegId(activeproddata.id)
        setOrd(activeproddata.OrdenProdId)
        SetPrima(activeproddata.mpid)
        SetConsAc(activeproddata.ume)
        SetProAc(activeproddata.mpume)
        SetNotas(activeproddata.Notas)
        SetCombs(activeproddata.combId)
        SetConsComb(activeproddata.conscomb)

        GetLoteByMaterial(activeproddata.mprima, (err, data) => {
          if(err) {
            toast.error("Se produjo un error al cargar los lotes", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            setLote(data)
            setSlote(activeproddata.Batch)
            let rest = data.filter(d => { return d.Lote == activeproddata.Batch})
            setRestante(rest[0].Restante)
            console.log(rest[0].Restante)
          }
        })
      }
    });
    
    
  }, [activeproddata])

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
              <form onSubmit={onFormSubmit} >
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SOrden">Orden Producción</InputLabel>
                    <Select
                      native
                      label="Orden"
                      name="orden"
                      className={classes.SelectStyle}
                      value={ord}
                      onChange={onChangeOrden}
                    >
                      <option value="0"> </option>
                      {ordenes.map((orden) => {
                        return (
                          <option key={orden.Id} value={orden.Id}>
                            {orden.Orden}
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
                      value={prima}
                      onChange={HandlerMaterial}
                    >
                      <option value="0"> </option>
                      {mprima.map((prima) => {
                        return (
                          <option key={prima.Id} value={prima.Id}>
                            {prima.Componente}
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
                      value={Slote}
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
                        label="Consumo Acumulado"
                        type="number"
                        className={classes.InputTextStyle}
                        value={consAc}
                        onChange={e => SetConsAc(e.target.value)}
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
                      label="Producción Acumulado"
                      customInput={TextField}
                      type="text"
                      className={classes.InputTextStyle}
                      value={proAc}
                      onChange={e => SetProAc(e.target.value)}
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
                      value={notas}
                      onChange={e => SetNotas(e.target.value)}
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

export default ProdFormEdit;
