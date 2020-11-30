import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Paper, Grid, Button, TextField } from "@material-ui/core";

import { GlobalContex } from "../../context/GlobalState";
import { getheadermfbftext, regheadermfbftext } from "../../context/Api";

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
  SearchPaper: {
    padding: "1rem",
    width: "45rem",
  }
}));

const MfbfHeaderText = () => {
  const classes = useStyle();
  const [texto, setTexto] = useState("");
  const aceroContext = useContext(GlobalContex);
  const { setToggleNotifMfbfText, NotifMfbfId } = aceroContext;

  const HandlerClose = (e) => {
    e.preventDefault();
    setToggleNotifMfbfText(false);
  };

  const HandlerSubmit = (e) => {
    e.preventDefault();
  
    const head = {
      id: NotifMfbfId,
      Texto: texto,
    };

    regheadermfbftext(head, (err, data) => {
      if (err) {
      } else {
        setToggleNotifMfbfText(false);
      }
    });
  };

  useEffect(() => {
    getheadermfbftext(NotifMfbfId, (err, data) => {
      if (err) {
      } else {
        if (data != null || data != "") {
          setTexto(data.TxtCabDoc);
        }
      }
    });
  }, []);

  return (
    <>
      <Grid  container
            direction="column"
            justify="center"
            alignItems="center"
            wrap="nowrap">
        <Paper elevation={3} className={classes.SearchPaper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid>
              <form onSubmit={HandlerSubmit}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TextField
                      id="TextId"
                      name="Tnotif"
                      label="Texto Notificación"
                      value={texto}
                      onChange={(e) => setTexto(e.target.value)}
                      type="Text"
                      multiline
                      rows={3}
                      className={classes.InputTextStyle}
                    />
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
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default MfbfHeaderText;
