import React from 'react'

import { makeStyles, Paper, Grid, Typography  } from "@material-ui/core";

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

const GrupoHeader = () => {
  const classes = useStyles();

    return (
        <>
          <Grid>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  wrap="nowrap">
              <Paper elevation={3} className={classes.SearchPaper}>
                <Grid item>
                  <Typography variant="h4" component="h4">
                    Administración de Grupos
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
    )
}

export default GrupoHeader
