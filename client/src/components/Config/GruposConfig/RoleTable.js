import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Fab
} from "@material-ui/core";

import { Pageview, Add, Work } from "@material-ui/icons";
import { GlobalContex } from "../../../context/GlobalState";

let rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  FabStyle: {
    position: "absolute",
    background: "#FFCC00",
    color: "#003366",
    right: "-1rem",
    top: "-2.5rem",
    zIndex: "999",
    "&:hover": {
      background: "#FFE166",
    },
  },
}));

const RoleTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { UserRolList, setTogglePerfil, setToggleRol, setActiveRol, setTogglePtr } = aceroContext;

  const columns = [
    {
      id: "Id",
      label: "Id",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "rol",
      label: "Rol",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Id",
      label: "Perfiles",
      minWidth: "100",
      align: "left",
      format: (value) => (
        <Button data-Id={value.toLocaleString()} onClick={(e)=>{  
          e.preventDefault()
          setActiveRol(e.currentTarget.dataset.id)
          setTogglePerfil(true)
          
          }}>
          <Pageview />
        </Button>
      ),
    },{
      id: "Id",
      label: "Puestos de Trabajo",
      minWidth: "100",
      align: "left",
      format: (value) => (
        <Button data-Id={value.toLocaleString()} onClick={(e)=>{  
          e.preventDefault()
          setActiveRol(e.currentTarget.dataset.id)
          setTogglePtr(true)
          }}>
          <Work />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (UserRolList != null || UserRolList != undefined) {
      rows = UserRolList;
      if (rowsPerPage == 10) {
        setRowsPerPage(5);
      } else {
        setRowsPerPage(10);
      }
    }
  }, [UserRolList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" wrap="nowrap">
      <Paper className={classes.root}>
        <Fab aria-label="add" className={classes.FabStyle} onClick={()=> {setToggleRol(true)}}>
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
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
};

export default RoleTable;
