import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Fab,
} from "@material-ui/core";
import { Add, DeleteForever } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContex } from "../../context/GlobalState";
import { delChatarraPos, getChatarraPos } from "../../context/Api"


let rows = []

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  FabStyle: {
    position: 'absolute',
    background: '#FFCC00',
    color: '#003366',
    right: '0',
    top: '-4rem',
    zIndex: '999',
    '&:hover':{
      background: "#FFE166"
    }
  },
}));

const ChatarraPos = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [PerfLeer, setPerfLeer] = useState(false)
  const [PerfEscr, setPerfEscr] = useState(false)
  const [PerfBorr, setPerfBorr] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex)
  const { chatarraPos, ChatarraHeaderId, SetChatarraPos, userRol } = aceroContext
  
  const columns = [
    {
      id: "Id",
      label: "Posicion",
      minWidth: "100",
      align: "left",
      format: (value) => value.toLocaleString(), //toFixed(2),
    },
    {
      id: "puestoTr",
      label: "Linea Producción",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "PesoEntrada",
      label: "Peso Entrada",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "PesoSalida",
      label: "Peso Salida",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "PesoChatarra",
      label: "Peso Chatarra",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "motivo",
      label: "Motivo Chatarra",
      minWidth: "200",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "tipochatarra",
      label: "Tipo Chatarra",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Texto",
      label: "Observación",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Id",
      label: "Eliminar",
      minWidth: "100",
      align: "left",
      format: (value) => {
        if(PerfBorr) {
          return <Button data-Id={value} onClick={handleDelete}> <DeleteForever/> </Button>
        } else {
          return <Button disabled> <DeleteForever/> </Button>
        }
      },
    },
  ];
  let elFab =  <Fab disabled aria-label="add" className={classes.FabStyle}>
                <Add/>
              </Fab>
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
      console.log(PerfEscr)
    })
  },[])
  useEffect(() => {
    if (chatarraPos !== null && chatarraPos !== undefined) {
      rows = chatarraPos
      if(rowsPerPage == 25) {
        setRowsPerPage(10)
      }
      else {
        setRowsPerPage(25)
      }
    } else {
      rows = []
    }
  },[chatarraPos])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (e) => {
    let id = parseInt(e.currentTarget.dataset.id)
    delChatarraPos(id, (err, data) => {
      if(err) {
        toast.error("Error al intentar eliminar el registro", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else {
        getChatarraPos(ChatarraHeaderId, (err, data) => {
          SetChatarraPos(data)
      })
      }
    })

  }

  if(PerfEscr) {
    elFab = <Fab aria-label="add" className={classes.FabStyle}>
              <Add/>
          </Fab>
  }

  return (
    <Paper className={classes.root}>
      <Link to="/chatarra/chatarForm">
        {elFab}
      </Link>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} id={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.idreg}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </Paper>
  )
};

export default ChatarraPos;
