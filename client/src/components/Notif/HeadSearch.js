import React, { useState, useContext } from "react";
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
import { NewReleases } from "@material-ui/icons";
import MomentUtils from "@date-io/moment";
import { GlobalContex } from "../../context/GlobalState";
import { getNotif, getNotifPos } from  "../../context/Api"

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

const HeadSearch = () => {
  const classes = useStyles();
  const [Fecha, SetFecha] = useState(new Date());
  const AceroContex = useContext(GlobalContex);
  const { userInfo, LoadNotifPos, LoadNotif  } = AceroContex;
  const puestos = userInfo.map((puesto) => {
    return {
      id: puesto.PuestoTrId,
      Descrit: puesto.PuestoTr,
      TypeNot: puesto.TipoNotif,
    };
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    const { ptr } = e.target.elements
    const data = {
      PtrId: ptr.value,
      Fecha: Fecha
    }
    getNotif(data, (err, data) => {
      if(err) {

      } else {
        console.log(data)
        LoadNotif(data)
      }
    })

    getNotifPos(data, (err, data)=> {
      if(err) {

      } else {
        console.log(data)
        LoadNotifPos(data)
      }
    })
  };

  const handleFechaCHange = (date) => {
    SetFecha(date._d);
  };

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
                  name="Fecha"
                  variant="inline"
                  inputVariant="outlined"
                  label="Seleccione Fecha Inicial"
                  format="MM/DD/YYYY"
                  className={classes.DatePick}
                  value={Fecha}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={handleFechaCHange}
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
                >
                  {puestos.map((puesto) => {
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
                startIcon={<NewReleases />}
              >
                Generar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default HeadSearch;
