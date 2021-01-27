import React, { useState, useContext, useEffect } from "react";
import { Grid, Paper, Button, makeStyles, CircularProgress  } from "@material-ui/core";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { ArrowBackIosRounded } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import { sapSendChatarra, setChatarraRegSap, delChatarraSap } from '../../context/Api'


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
  btnBI: {
      background: "#003366",
      color: "#ffcc00",
      margin: ".6em 0",
      marginBottom: "-5rm",
      "&:hover": {
        color: "white",
        background: " #003499",
      },
    },
  btnDel: {
    background: "#d50000",
    color: "white",
    margin: ".6em 0",
    marginBottom: "-5rm",
    "&:hover": {
      color: "white",
      background: "#9b0000",
    },
  },
  spinColor: {
      margin: 'auto',
      padding: '10px',
      alignContent: 'center',
      color: '#003366',
    },
  Transparent: {
    background: 'rgba(255,255,255,0.5)',
    zIndex: '99',
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
  }
  },
}));

let btn = null
let btnDel = null
const HeaderPanel = () => {
  const classes = useStyles();
  const AceroContex = useContext(GlobalContex);
  const [PerfLeer, setPerfLeer] = useState(false)
  const [PerfEscr, setPerfEscr] = useState(false)
  const [PerfBorr, setPerfBorr] = useState(false)
  const { chatarraHeader, chatarraPos, ClearChatarra, ChatarraHeaderId, LoadChataraHeader, userRol, userInfo, Loading, setLoading } = AceroContex;
  

  const chatarraToSap = (e) =>{
    e.preventDefault();
    
    try {
        setLoading(true)
        console.log('Loading On')
        let date = new Date()
        let dareg = new Date(chatarraHeader.Fecha)
        let Posiciones = [];
        let month = dareg.getMonth()+1
        let day = dareg.getDate()
        if(day < 10) {
          day =`0${day}`
        } 
        if(month < 10) {
          month = `0${month}`
        }

        const Header = {
          DocDate : `${dareg.getFullYear()}-${month}-${day}`,
          PstngDate : `${date.getFullYear()}-${month}-${day}`,
          HeaderTxt : `Chatarra ${chatarraHeader.OperadorId}`
        }
        
        chatarraPos.map((p) => {
          Posiciones.push({
            Material: p.Material,
            Plant: p.Plant,
            StgeLoc: p.StgeLoc,
            MoveType: p.MoveType,
            EntryQnt: p.PesoChatarra,
            EntryUom: p.EntryUom,
            Costcenter: p.Costcenter,
            MoveReas: 30
          })
        })

        let ZgmAcerogmChatarra = {
          Header,
          Posiciones
      }

        sapSendChatarra(ZgmAcerogmChatarra, (err, data) =>{
          if(err) {
            toast.error(err, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            let Chatarra = {
              HeaderId: ChatarraHeaderId,
              RegSap: data
            }
            setChatarraRegSap(Chatarra, (err, data) => {
              if(err) {
                toast.error(err, {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
                setLoading(false)
                console.log('Loading On')
              } else {
                if(parseInt(data) == NaN){
                  toast.error(data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
                  setLoading(false)
                  console.log('Loading On')
                } else{
                    setLoading(false)
                    LoadChataraHeader(data) 
                    console.log('Loading off')
                    toast.success("Registro Completado", {
                      position: toast.POSITION.TOP_RIGHT
                    });

                  }
              }
            })
          }
        })
      } catch (error) {
        toast.error("Ocurrio un error al intentar enviar los datos", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
  }

  const chatarraDelToSap = (e) =>{
    e.preventDefault();
    
    try {
        setLoading(true)
        let date = new Date()
        let dareg = new Date(chatarraHeader.Fecha)
        let Posiciones = [];
        let month = dareg.getMonth()+1
        let day = dareg.getDate()
        if(day < 10) {
          day =`0${day}`
        } 
        if(month < 10) {
          month = `0${month}`
        }
        

        const Header = {
          DocDate : `${dareg.getFullYear()}-${month}-${day}`,
          PstngDate : `${date.getFullYear()}-${month}-${day}`,
          HeaderTxt : `Chatarra ${chatarraHeader.OperadorId}`
        }
        
        chatarraPos.map((p) => {
          Posiciones.push({
            Material: p.Material,
            Plant: p.Plant,
            StgeLoc: p.StgeLoc,
            MoveType: p.MoveTypeDel,
            EntryQnt: p.PesoChatarra,
            EntryUom: p.EntryUom,
            Costcenter: p.Costcenter,
            MoveReas: '0001'
          })
        })

        let ZgmAcerogmChatarra = {
          Header,
          Posiciones
      }

        sapSendChatarra(ZgmAcerogmChatarra, (err, data) =>{
          if(err) {
            toast.error(err, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            setLoading(false)
          } else {
            let Chatarra = {
              Id: ChatarraHeaderId,
              regSap: data,
              usrId: userInfo[0].CodigoEmp
            }
            delChatarraSap(Chatarra, (err, data) => {
              if(err) {
                setLoading(false)
                toast.error(err, {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
              } else{
                setLoading(false)
                toast.success('Los resistros han sido eliminados', {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
                ClearChatarra()
              }
            })

          }
        })
      } catch (error) {
        toast.error("Ocurrio un error al intentar enviar los datos", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
  }

  useEffect(()=>{
    let perf = userRol.filter(f => {
      return f.rol == "Chatarra"
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
  },[])

  useEffect(()=>{
    if (Loading) {
        btn = <CircularProgress  />
        console.log(Loading)
    } else {
      if(chatarraHeader.RegistroSap !== null) {
        btn = <Button className={classes.btnB} disabled>Enviar a Sap</Button>
        if(PerfBorr) {
          btnDel = <Button style={{background: "#d50000", color: "white"}} onClick={chatarraDelToSap} >Eliminar Registro Sap</Button>
        } else {
          btnDel = null
        }
      } else {
        if(PerfEscr){
          console.log(Loading)
          console.log(chatarraPos)
          if(chatarraPos !== null && chatarraPos.length > 0 ) {
            btn = <Button className={classes.btnB} onClick={chatarraToSap}>Enviar a Sap</Button>
          } else {
            btn = <Button className={classes.btnBI} disabled >Enviar a Sap</Button>
          }
          
        } else {
          btn = <Button className={classes.btnBI} disabled >Enviar a Sap</Button>
        }
      }
    }
    return () => {
      setLoading(false)
    }

  },[Loading, chatarraPos, chatarraHeader, PerfEscr])


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
              {btn} {btnDel}
            </div>
          </Grid>
        </Grid>
  
      </Paper>
      <ToastContainer />
    </>
  );
};

export default HeaderPanel;
