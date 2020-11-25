import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Grid,
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
import { ArrowBackIosRounded, Add, Accessibility } from "@material-ui/icons";
import { GlobalContex } from "../../../context/GlobalState";
import { getGrupoInPtr } from "../../../context/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative"
  },
  FabStyle: {
    position: "absolute",
    background: "#FFCC00",
    color: "#003366",
    right: "0",
    top: "-1rem",
    zIndex: "999",
    "&:hover": {
      background: "#FFE166",
    },
  },
}));

let rows = [];

const GruposTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { GrupoPtrId, setToogleGrupo, setToggleAddGrupo, 
          setToggleAddMember, setUserSearch, setToggleMemberList, 
          setActiveGrupoId } = aceroContext;

  const columns = [
    {
      id: "Id",
      label: "Id",
      minWidth: "100",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "grupo",
      label: "Grupo",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Id",
      label: "Colaboradores",
      minWidth: "170",
      align: "left",
      format: (value) =>  (
        <Button data-Id={value} onClick={handlerListMember}>
          <Accessibility />
        </Button>
      )
    },
    {
      id: "Id",
      label: "Agregar",
      minWidth: "170",
      align: "left",
      format: (value) =>  (
        <Button data-Id={value} onClick={handleAdd}>
          <Add />
        </Button>
      )
    }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAdd = (e) => {
    e.preventDefault()
    setUserSearch({CodigoEmp:"", Nombres: "", Estatus: "I"})
    setActiveGrupoId(e.currentTarget.dataset.id)
    setToogleGrupo(false)
    setToggleAddMember(true)
  }

  const handlerListMember = (e) => {
    e.preventDefault()
    setActiveGrupoId(e.currentTarget.dataset.id)
    setToggleMemberList(true)
    setToogleGrupo(false)
  } 

  useEffect(() => {
    getGrupoInPtr(GrupoPtrId, (err, data) => {
      if (err) {
      } else {
        rows = data;
        if (rowsPerPage == 5) {
          setRowsPerPage(10);
        } else {
          setRowsPerPage(5);
        }
      }
    });
  }, []);

  return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        wrap="nowrap"
      >
      <Grid className={classes.root}>
        <Paper elevation={3}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setToogleGrupo(false);
            }}
          >
            <ArrowBackIosRounded />{" "}
          </Button>
          <div>
          <Fab aria-label="add" className={classes.FabStyle} onClick={(e) => {
                                                                              e.preventDefault() 
                                                                              setToggleAddGrupo(true)
                                                                              setToogleGrupo(false)
                                                                                  }}>
            <Add />
          </Fab>
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
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
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
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GruposTable;
