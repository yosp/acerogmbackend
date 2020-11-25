import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Fab,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import { Add, Pageview, Edit, DeleteForever } from "@material-ui/icons";
import { GlobalContex } from "../../context/GlobalState";
import { getApiRegProdComp, delPosRegProd, getRegProd } from "../../context/Api"
let rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  FabStyle: {
    position: "absolute",
    background: "#FFCC00",
    color: "#003366",
    right: "0",
    top: "-4rem",
    zIndex: "999",
    "&:hover": {
      background: "#FFE166",
    },
  },
}));

const DatosProduccion = () => {
  const classes = useStyles();
  const [PerfLeer, setPerfLeer] = useState(false)
  const [PerfEscr, setPerfEscr] = useState(false)
  const [PerfBorr, setPerfBorr] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { regproddata, LoadRegCompData, SetNumComp, SetOrdenComp, headerReg, loadRegProdData, SetEditProdData, userRol  } = aceroContext;
  const history = useHistory()
  
  const columns = [
    {
      id: "id",
      label: "Eliminar",
      minWidth: "100",
      align: "left",
      format: (value) => {
        if(PerfBorr){
          return <Button data-Id={value} onClick={handleDelete}> <DeleteForever/> </Button>
        } else {
          return <Button disabled > <DeleteForever/> </Button>
        }
      },
    },
    {
      id: "Orden",
      label: "Orden Prod",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "mprima",
      label: "Materia Prima",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "lote",
      label: "Lote Mp",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "producto",
      label: "Producto",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "HoraEdit",
      label: "Hora",
      minWidth: "200",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Eph",
      label: "EPH",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "ume",
      label: "Consumo Acumulado",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "mpume",
      label: "Producción Acumulado",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "umb",
      label: "Unidad de Medida",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "comb",
      label: "Combustible",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "conscomb",
      label: "Consumo Combustible",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "conselect",
      label: "Consumo Electricidad",
      minWidth: "170",
      align: "center",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Notas",
      label: "Observación",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },{
      id: "id",
      label: "Componentes",
      minWidth: "100",
      align: "left",
      format: (value) => <Button data-Id={value} onClick={handleGetPrima}> <Pageview/> </Button>,
    },{
      id: "id",
      label: "Agregar Componente",
      minWidth: "100",
      align: "left",
      format: (value) =>{ 
        if(PerfEscr) {
          return <Button data-Id={value} onClick={handleAddMPrima}> <Add/> </Button>
        } else {
          return <Button disabled > <Add/> </Button>
        }
      },
    },{
      id: "id",
      label: "Editar",
      minWidth: "100",
      align: "left",
      format: (value) => {
        if(PerfEscr) {
          return <Button data-Id={value} onClick={handlerEdit}> <Edit/> </Button>
        } else {
          return <Button disabled> <Edit/> </Button>
        }
      },
    },
  ]
  const handleAddMPrima = (e) => {
    e.preventDefault()
    let registro = regproddata.filter(reg => {
      return reg.id == e.currentTarget.dataset.id
    })
    let CompOrden = registro[0]
    console.log(CompOrden)
    SetOrdenComp(CompOrden)
    SetNumComp(e.currentTarget.dataset.id)
    history.push("/registro/prodcomp")
  }

  const handleGetPrima = (e) => {
    e.preventDefault()
    
    SetNumComp(e.currentTarget.dataset.id)
    getApiRegProdComp(e.currentTarget.dataset.id, (err, data) => {
      if(err) {

      }else {
        LoadRegCompData(data)
      }
    })
  }

  const handlerEdit = (e) => {
    let registro = regproddata.filter(reg => {
      return reg.id == e.currentTarget.dataset.id
    })
    SetEditProdData(registro[0])
    history.push("/registro/prodreg/edit")
  }

  const handleDelete = (e) => {
    let id = e.currentTarget.dataset.id
    delPosRegProd(id, (err, data) => {
      if(err) {

      }
      else {
        getRegProd(headerReg.id, (err, data) => {
          loadRegProdData(data)
      })
      }
    })

  }

  useEffect(()=>{
    let perf = userRol.filter(f => {
      return f.IdRol == 3
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
  useEffect(() => {
    if (regproddata !== null && regproddata !== undefined) {
      regproddata.map((reg) => {
        reg.HoraEdit = moment(new Date(reg.Hora)).format("LT");
        
        return reg;
      });
      rows = regproddata;

      if(rowsPerPage == 25) {
        setRowsPerPage(10);
      } else {
        setRowsPerPage(25);
      }
    }
  }, [regproddata]);

  let elFab = <div></div>

  if(PerfEscr) {
    elFab = <Link to="/registro/prodreg">
              <Fab aria-label="add" className={classes.FabStyle}>
                <Add />
              </Fab>
            </Link>
  } else {
    elFab =  <Fab aria-label="add" disabled className={classes.FabStyle}>
                <Add />
              </Fab>
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      {elFab}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  id={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};


export default DatosProduccion;
