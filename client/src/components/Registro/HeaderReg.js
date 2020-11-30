import React, { useContext , useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow
} from "@material-ui/core";
import { GlobalContex } from '../../context/GlobalState'
import {
    ArrowBackIosRounded,
    Delete
} from '@material-ui/icons'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getRegProd, getRegParada } from '../../context/Api' 

const useStyles = makeStyles(theme => ({
    PaperSite: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "2rem",
    margin: "2rem",
    height: "16rem",
    [theme.breakpoints.down('xs')]: {
        overflow: "scroll"
    },
    [theme.breakpoints.down('sm')]: {
        overflow: "scroll"
    },
    [theme.breakpoints.up('md')]: {
        overflow: "hiden"
    },
    [theme.breakpoints.up('lg')]: {
        overflow: "hiden"
    },
    [theme.breakpoints.up('xl')]: {
        overflow: "hiden"
    }
    
  },
  GridContainer: {
    
  },
  GridSections: {
      padding: "2rem",
      margin: "2rem"
  },
  GridSideTable: {
  },
  dividerStyle: {
    margin: '.3rem'
  },

  ButtonSection: {
    bottom: '0',
    left: '39rem'
  },
  btnB: {
    background: "red",
    color: "white",
    margin: "0 .5em",
    marginBottom: "-5rm",
    '&:hover': {
        color: 'black', 
        background: " #ffcccb"
}
  }

}));

const HeaderReg = ({ header }) => {
    const classes = useStyles();
    const aceroContext = useContext(GlobalContex)
    const { integrantesGrp, clearHeaderRegActive, loadRegProdData, loadRegPadadData, headerReg, userRol  } = aceroContext
    const [PerfLeer, setPerfLeer] = useState(false)
    const [PerfEscr, setPerfEscr] = useState(false)
    const [PerfBorr, setPerfBorr] = useState(false)
    let listaGrp = integrantesGrp.map(grp => {
        return {
            nombre: grp.Nombres,
            grupo: grp.grupo
        }
    }).filter(g => {
        return g.grupo === header.Grupo
    })
    listaGrp = [... new Set(listaGrp)]

    useEffect(() => {
        getRegProd(header.id, (err, data) => {
          if(err) {
            toast.error("Ocurrio un error al cargar los registros de producción", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            console.error(err)
          } else {
            loadRegProdData(data)
          }
        })
        getRegParada(header.id, (err, data) => {
          if(err) {
            toast.error("Ocurrio un error al cargar las paradas", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            console.error(err)
          } else {
            loadRegPadadData(data)
          }
        })

        let perf = userRol.filter(f => {
          return f.rol == "Reg Producción"
        })
        perf.forEach(p => {
          if(p.IdPerfil === 1) {
            setPerfEscr(true)
          } 

          if(p.IdPerfil === 2) {
            setPerfLeer(true)
          } 

          if(p.IdPerfil === 3) {
            setPerfBorr(true)
          } 

        })
    },[headerReg])

    let btnElim = <div>
      <Button type="submit" className={classes.btnB} startIcon={<Delete />} >
              Eliminar
            </Button>
    </div>

    if(PerfBorr) {
      btnElim = <div>
                <Button type="submit" className={classes.btnB} startIcon={<Delete />} >
                  Eliminar
                </Button>
              </div>
    } else {
      btnElim = <div>
      <Button type="submit" disabled className={classes.btnB} startIcon={<Delete />} >
        Eliminar
      </Button>
    </div>
    }

    const handlerBack = (e) => {
        e.preventDefault()
        clearHeaderRegActive()
    }

  return (
    <>
      <Paper elevation={4} className={classes.PaperSite}>
        <Grid
          spacing={3}
          container
          justify="flex-start"
          alignContent="space-between"
          wrap="wrap"
          direction="row"
        >
          <Grid item>
            <div><Button onClick={handlerBack}><ArrowBackIosRounded/></Button></div>
            <div><b>Fecha:</b> {moment(header.Fecha).format('L')}</div>
            <div><b>Turno:</b> {header.Turno}</div>
            <div><b>Grupo:</b> {header.Grupo}</div>
            <div><b>Puesto de Trabajo: </b> {header.Puesto}</div>
            {
                listaGrp.map(l => {
                    return <div key={l.nombre}><b>Operador: </b>{l.nombre}</div>
                })
            }
          </Grid>
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>TC</b>
                    </TableCell>
                    <TableCell>
                      <b>TL</b>
                    </TableCell>
                    <TableCell>
                      <b>TE</b>
                    </TableCell>
                    <TableCell>
                      <b>TOP</b>
                    </TableCell>
                    <TableCell>
                      <b>TOMP</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{headerReg.TC}</TableCell>
                    <TableCell>{headerReg.TL}</TableCell>
                    <TableCell>{headerReg.TE}</TableCell>
                    <TableCell>{headerReg.TOPR}</TableCell>
                    <TableCell>{headerReg.TOMP}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>TI</b>
                    </TableCell>
                    <TableCell>
                      <b>TPP</b>
                    </TableCell>
                    <TableCell>
                      <b>M</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{headerReg.TIM}</TableCell>
                    <TableCell>{headerReg.TPPM}</TableCell>
                    <TableCell>
                      <b>M</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{headerReg.TPPO}</TableCell>
                    <TableCell>{headerReg.TPPM}</TableCell>
                    <TableCell>
                      <b>O</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{headerReg.TI}</TableCell>
                    <TableCell>{headerReg.TPP}</TableCell>
                    <TableCell>
                      <b>TOT</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item className={classes.GridSections}>
            {btnElim}
          </Grid>
        </Grid>
      </Paper>
      <ToastContainer />
    </>
  );
};

export default HeaderReg;
