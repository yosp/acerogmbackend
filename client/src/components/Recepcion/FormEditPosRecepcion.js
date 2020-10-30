import "moment";
import React, { useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  makeStyles,
  InputLabel,
  Tooltip
} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab'
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from "../../context/GlobalState";
import { getMateriales, UpdPosRecepcion } from "../../context/Api";

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

const FormEditPosRecepcion = () => {
  const classes = useStyle();
  const [hora, setHora] = useState(new Date());
  const [Materiales, setMateriales] = useState([])
  const [StrEntrada, setStrEntrada] = useState()
  const [RMaterial, setRMaterial] = useState()
  const [Lote, setLote] = useState()
  const [Peso, setPeso] = useState()
  const [Suplidor, setSuplidor] = useState()
  const [Recibida, setRecibida] = useState()
  const [Cargada, setCargada] = useState()
  const [Restante, setRestante ] = useState()
  const [Dim1, setDim1] = useState()
  const [Dim2, setDim2] = useState()
  const [Dim3, setDim3] = useState()
  const [Dim4, setDim4] = useState()
  const aceroContext = useContext(GlobalContex);
  const { user, RecepcionHeader, Suplidores, GrupoRecepcion, setPosRecepcion, ActivePosReception } = aceroContext
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const {
      AutoMaterial,
      GrupoR,
      Lote,
      Peso,
      Suplidor,
      CRecibida,
      CCargada,
      CRestante,
      Dim1,
      Dim2,
      Dim3,
      Dim4,
    } = e.target.elements;

    let PosRecepciones = {
      Id: ActivePosReception.Id,
      headerId: RecepcionHeader.Id,
      StrEntrada: GrupoR.value,
      Material: AutoMaterial.value,
      Hora: new Date(hora._d),
      Lote: Lote.value,
      Peso: Peso.value,
      Suplidor: Suplidor.value,
      Recibida: CRecibida.value,
      Cargada: CCargada.value,
      Restante: CRestante.value,
      Dim1: Dim1.value,
      Dim2: Dim2.value,
      Dim3: Dim3.value,
      Dim4: Dim4.value,
      UsrReg: user.CodigoEmp
    }
    UpdPosRecepcion(PosRecepciones, (err, res) => {
      if(err){
        toast.error("Se produjo un error al intentar actualizar el registro de recepcion", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setPosRecepcion(res)
        history.push("/Recepcion");
      }
    })
  }

  const handleDateChange = (date) => {
    setHora(date)
  }

  const HandlerClose = (e) => {
    e.preventDefault();
    history.push("/Recepcion");
  };
  useEffect(()=>{
    getMateriales(' ', (err, data) => {
      if(err) {
        toast.error("Se produjo un error al cargar los Materiales", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }else {
        setMateriales(data)
      }
    })
    setRMaterial(ActivePosReception.Material)
    setStrEntrada(ActivePosReception.strEntradaId)
    setLote(ActivePosReception.Lote)
    setPeso(ActivePosReception.Peso)
    setSuplidor(ActivePosReception.Suplidor)
    setRecibida(ActivePosReception.CantRecibida)
    setCargada(ActivePosReception.CantCargada)
    setRestante(ActivePosReception.CantRestante)
    setDim1(ActivePosReception.Dim1)
    setDim2(ActivePosReception.Dim2)
    setDim3(ActivePosReception.Dim3)
    setDim4(ActivePosReception.Dim4)
  },[])

    return (
        <>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}>
            <Grid item xs={10} sm={8} md={6} lg={6}>
              <Paper elevation={3}>
                <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}>
                  <form onSubmit={onFormSubmit}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <InputLabel id="SGrupoR">Grupo Recepción</InputLabel>
                        <Select
                          native
                          label="Grupo Recepción"
                          name="GrupoR"
                          value={StrEntrada}
                          onChange={e => setStrEntrada(e.target.value)}
                          className={classes.SelectStyle}
                        >
                          <option value="0"> </option>
                          {GrupoRecepcion.map((gr) => {
                            return (
                              <option key={gr.GrupoId} value={gr.GrupoId}>
                                {gr.Titulo}
                              </option>
                            );
                          })}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                      <Autocomplete
                              id="AutoMaterial"
                              name="AutoMaterial"
                              style={{ width: 300 }}
                              options={Materiales}
                              value={RMaterial}
                              onChange={e => setRMaterial(e.target.value)}
                              classes={{
                                option: classes.option,
                              }}
                              autoHighlight
                              getOptionLabel={(option) => option.title}
                              renderOption={(option) => (
                                <React.Fragment>
                                  {option.title.toLowerCase()} - {option.Descripcion.toLowerCase()}
                                </React.Fragment>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  className={classes.InputTextStyle}
                                  label="Material"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
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
                        <Tooltip title="Solo Numeros" placement="right">
                          <TextField
                            id="Lote"
                            name="Lote"
                            label="Lote"
                            value={Lote}
                            onChange={e => setLote(e.target.value)}
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
                            id="Peso"
                            name="Peso"
                            label="Peso"
                            value={Peso}
                            onChange={e => setPeso(e.target.value)}
                            customInput={TextField}
                            type="text"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <InputLabel id="LSuplidor">Suplidor</InputLabel>
                        <Select
                          native
                          label="Suplidor"
                          name="Suplidor"
                          value={Suplidor}
                          onChange={e => setSuplidor(e.target.value)}
                          className={classes.SelectStyle}
                        >
                          <option value="0"> </option>
                          {Suplidores.map((sp) => {
                            return (
                              <option key={sp.Id} value={sp.Id}>
                                {sp.Descripcion}
                              </option>
                            );
                          })}
                        </Select>
                      </Grid>        
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Tooltip title="Solo Numeros" placement="right">
                          <TextField
                            id="Crecibida"
                            name="CRecibida"
                            label="Cant Recibida"
                            value={Recibida}
                            onChange={e => setRecibida(e.target.value)}
                            type="number"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Tooltip title="Solo Numeros" placement="right">
                          <TextField
                            id="CCargada"
                            name="CCargada"
                            label="Cant Cargada"
                            value={Cargada}
                            onChange={e => setCargada(e.target.value)}
                            type="number"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Tooltip title="Solo Numeros" placement="right">
                          <TextField
                            id="CRestante"
                            name="CRestante"
                            label="Cant Restante"
                            value={Restante}
                            onChange={e => setRestante(e.target.value)}
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
                            id="Dim1"
                            name="Dim1"
                            label="Dim1"
                            value={Dim1}
                            onChange={e => setDim1(e.target.value)}
                            customInput={TextField}
                            type="text"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Tooltip title="Solo Numeros" placement="right">
                          <NumberFormat
                            id="Dim2"
                            name="Dim2"
                            label="Dim2"
                            value={Dim2}
                            onChange={e => setDim2(e.target.value)}
                            customInput={TextField}
                            type="text"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Tooltip title="Solo Numeros" placement="right">
                          <NumberFormat
                            id="Dim3"
                            name="Dim3"
                            label="Dim3"
                            value={Dim3}
                            onChange={e => setDim3(e.target.value)}
                            customInput={TextField}
                            type="text"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Tooltip title="Solo Numeros" placement="right">
                          <NumberFormat
                            id="Dim4"
                            name="Dim4"
                            label="Dim4"
                            value={Dim4}
                            onChange={e => setDim4(e.target.value)}
                            customInput={TextField}
                            type="text"
                            className={classes.InputTextStyle}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
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
            <ToastContainer/>
          </Grid>   
        </>
    )
}

export default FormEditPosRecepcion
