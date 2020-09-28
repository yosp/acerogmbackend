import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";
import { GlobalContex } from "../../context/GlobalState";



let rows = [];

const useStyles = makeStyles(theme => ({
  rootContainer: {},
  SearchPaper: {
    margin: "1rem 0 .5rem 0",
    padding: '.5rem',
    width: "30rem"
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

const Componentes = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { OrdenCompList } = aceroContext

  useEffect(() =>{
    if(OrdenCompList != null || OrdenCompList != undefined) {
      rows = OrdenCompList
      if(rowsPerPage == 10) {
        setRowsPerPage(25)
      } else {
        setRowsPerPage(10)
      }
    }
  }, [OrdenCompList])

  const columns = [
    {
      id: "Id",
      label: "id",
      minWidth: "100",
      align: "left",
      format: value => value.toLocaleString() //toFixed(2),
    },
    {
      id: "Orden",
      label: "Orden",
      minWidth: "100",
      align: "left",
      format: value => value.toLocaleString() //toFixed(2),
    },
    {
      id: "Componente",
      label: "Componente",
      minWidth: "170",
      align: "left",
      format: value => value.toLocaleString()
    },
    {
      id: "Un_Medida",
      label: "Un Medida",
      minWidth: "170",
      align: "left",
      format: value => value.toLocaleString()
    }
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
        <Paper elevation={3} className={classes.ResultPaper}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
        </Paper>
      </Grid>
  )
};

export default Componentes;
