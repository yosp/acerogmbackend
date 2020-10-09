import React, { useState, useContext, useEffect } from "react";
import { Grid, Paper, Button, makeStyles  } from "@material-ui/core";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { ArrowBackIosRounded } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import { sapSendChatarra, setChatarraRegSap } from '../../context/Api'


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

const HeaderPanel = () => {
  const classes = useStyles();
  const AceroContex = useContext(GlobalContex);
  const { chatarraHeader, chatarraPos, ClearChatarra, ChatarraHeaderId, LoadChataraHeader, setLoading } = AceroContex;
  let btn = null

  const chatarraToSap = (e) =>{
    e.preventDefault();
    
    try {
        let date = new Date()
        let dareg = new Date(chatarraHeader.Fecha)
        let Posiciones = [];
        let day = dareg.getDate()
        if(day < 10) {
          day =`0${day}`
        } 
        

        const Header = {
          DocDate : `${dareg.getFullYear()}-${dareg.getMonth()+1}-${day}`,
          PstngDate : `${date.getFullYear()}-${date.getMonth()+1}-${day}`,
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
              } else {
                if(parseInt(data) == NaN){
                  toast.error(data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
                } else{
                    setLoading(false)
                    LoadChataraHeader(data) 
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

  useEffect(()=> {

  },[chatarraHeader])


  if(chatarraHeader.RegistroSap != null) {
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
      <ToastContainer />
    </>
  );
};

export default HeaderPanel;
