import React from 'react'
import {
    Paper,
    makeStyles,
} from "@material-ui/core";

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
const PosSubTitle = () => {
  const classes = useStyles();
    return (
        <>
            <Paper elevation={4} className={classes.PaperSite}>
              <h3>Posiciones</h3>
            </Paper>
        </>
    )
}

export default PosSubTitle
