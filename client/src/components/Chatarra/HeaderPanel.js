import React, { useContext } from "react";
import { Grid, Paper, Button, makeStyles } from "@material-ui/core";
import moment from "moment";
import { ArrowBackIosRounded } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import { sapSendChatarra } from '../../context/Api'

const useStyles = makeStyles((theme) => ({
  PaperSite: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "2rem",
    margin: "2rem",
    height: "13rem",
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
    background: "#003366",
    color: "white",
    margin: ".6em 0",
    marginBottom: "-5rm",
    "&:hover": {
      color: "white",
      background: " #003499",
    },
  },
}));

const HeaderPanel = () => {
  const classes = useStyles();
  const AceroContex = useContext(GlobalContex);
  const { chatarraHeader, chatarraPos, ClearChatarra  } = AceroContex;

  let btn = null

  const chatarraToSap = (e) =>{
    e.preventDefault();
    let date = new Date()
    let dareg = new Date(chatarraHeader.Fecha)
    let Posiciones = [];

    const Header = {
      DocDate : `${dareg.getFullYear()}${dareg.getMonth()+1}${dareg.getDate()}`,
      PstngDate : `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
      HeaderTxt : `Chatarra ${chatarraHeader.OperadorId}-${chatarraHeader.Operador}`
    }

    chatarraPos.map((p) => {
      Posiciones.push({
        Material: "DCL001",
        Plant: "1000",
        StgeLoc: "0420",
        MoveType: "913",
        EntryQnt: 1360,
        EntryUom: "KG",
        Costcenter: "1000181080",
        MoveReas: 30
      })
    })

    let ZgmAcerogmChatarra = {
      Header,
      Posiciones
    }

    sapSendChatarra(ZgmAcerogmChatarra, (err, data) =>{
      console.log(data)
    })
  }

  if(chatarraHeader.RegistroSap) {
    btn = <Button className={classes.btnB} disabled>Enviar a Sap</Button>
  } else {
    btn = <Button className={classes.btnB} onClick={chatarraToSap}>Enviar a Sap</Button>
  }

  const handlerBack = (e) => {
    e.preventDefault();
    ClearChatarra()
  };

  return (
    <>
      <Paper elevation={4} className={classes.PaperSite}>
        <Grid
          spacing={2}
          container
          justify="flex-start"
          alignContent="space-between"
          wrap="wrap"
          direction="row"
        >
          <Grid item>
            <div>
              <Button onClick={handlerBack}>
                <ArrowBackIosRounded />
              </Button>
            </div>
            <h3>Chatarra</h3>
            <div>
              <b>Fecha:</b> {moment(chatarraHeader.Fecha).format('L')}
            </div>
            <div>
              <b>Turno:</b> {chatarraHeader.Turno}
            </div>
            <div>
              <b>Operador:</b> {chatarraHeader.Operador}
            </div>
            <div>
              <b>Registro Sap:</b> {chatarraHeader.RegistroSap}
            </div>
            <div>
              {btn}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default HeaderPanel;
