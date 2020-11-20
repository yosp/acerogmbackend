import React, { useContext, useEffect } from "react";

import { GlobalContex } from "../../context/GlobalState";
import {
  getApiTurnos,
  getApiGrupos,
  getApiIntegrantesGrp,
  getApiOdenenes,
  getEntradaGrupo,
} from "../../context/Api";
import NavigationBar from "../Util/NavBar";
import LogoutPopup from "../Util/LogoutPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const AceroContext = useContext(GlobalContex);
  const {
    getTurnos,
    getGrupos,
    getIntegrantesGrupos,
    turnos,
    grupos,
    setGrupoRecep,
    integrantesGrp,
    ordenes,
    getOrdenes,
    // , setSuplidores
    // , Suplidores
    GrupoRecepcion,
  } = AceroContext;

  useEffect(() => {
    if (turnos === null || turnos === undefined) {
      getApiTurnos((err, data) => {
        if (err) {
        } else {
          getTurnos(data);
        }
      });
    }

    // if(Suplidores === null || Suplidores === undefined) {
    //     getSuplidores((err, data) => {
    //         if(err) {

    //         } else {
    //             setSuplidores(data)
    //         }
    //     })
    // }

    if (GrupoRecepcion === null || GrupoRecepcion === undefined) {
      getEntradaGrupo((err, data) => {
        if (err) {
          toast.error("Se produjo un error al cargar los grupos de Recepcion", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          setGrupoRecep(data);
        }
      });
    }

    if (ordenes === null || ordenes === undefined) {
      getApiOdenenes((err, data) => {
        if (err) {
          toast.error("Se produjo un error al cargar los suplidores", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          getOrdenes(data);
        }
      });
    }

    if (grupos === null || grupos === undefined) {
      getApiGrupos((err, grupos) => {
        if (err) {
        } else {
          getGrupos(grupos);
        }
      });
      if (integrantesGrp === null || integrantesGrp === undefined) {
        getApiIntegrantesGrp((err, lista) => {
          if (err) {
          } else {
            getIntegrantesGrupos(lista);
          }
        });
      }
    }
  }, []);

  return (
    <>
      <NavigationBar />
      Dashboard
      <ToastContainer />
      <LogoutPopup />
    </>
  );
};

export default Dashboard;
