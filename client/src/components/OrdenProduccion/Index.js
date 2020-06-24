import React, { useState } from "react";
import { makeStyles, 
          Paper, 
          Grid, 
          TextField, 
          Button,
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableHead,
          TableRow,
          TablePagination
        } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import NavigationBar from "../Util/NavBar";
import Componentes from './Componentes'

const columns = [
  {
    id: 'id',
    label: "id",
    minWidth: "100",
    align: 'left',
    format: value => value.toLocaleString() //toFixed(2),
  },
  {
    id: 'Arbpl',
    label: "Arbpl",
    minWidth: "100",
    align: 'left',
    format: value => value.toLocaleString() //toFixed(2),
  },
  {
    id: 'Aufnr',
    label: "Aufnr",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Bmsch',
    label: "Bmsch",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Eph',
    label: "Eph",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Gamng',
    label: "Gamng",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString(),
  },
  {
    id: 'Gltrs',
    label: "Gltrs",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Gmein',
    label: "Gmein",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Gstrp',
    label: "Gstrp",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Plnbez',
    label: "Plnbez",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },
  {
    id: 'Plnnr',
    label: "Plnnr",
    minWidth: "170",
    align: 'center',
    format: value => value.toLocaleString()
  },
  {
    id: 'Verid',
    label: "Verid",
    minWidth: "170",
    align: 'center',
    format: value => value.toLocaleString()
  },
  {
    id: 'Vgw01',
    label: "Vgw01",
    minWidth: "170",
    align: 'center',
    format: value => value.toLocaleString()
  },
  {
    id: 'Vornr',
    label: "Vornr",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  },{
    id: 'Werks',
    label: "Werks",
    minWidth: "170",
    align: 'left',
    format: value => value.toLocaleString()
  }
];

const rows = [
  {
    id: 1,
    Arbpl: "CLAV-004",
    Aufnr: "294633",
    Eph: "2.51",
    Gamng: "120.0",
    Gltrs: '2020-01-25',
    Gmein: "QQ",
    Gstrp: "2020-01-23",
    Plnbez: 'CC001',
    Plnnr: "50001654",
    Verid: "0005",
    Vgw01: "8.400",
    Vornr: "0010",
    Werks: "1001",
    Bmsch: "1000.0"
  },
  {
    id: 2,
    Arbpl: "CLAV-009",
    Aufnr: "294633",
    Eph: "12.5",
    Gamng: "120.0",
    Gltrs: '2020-01-25',
    Gmein: "QQ",
    Gstrp: "2020-01-23",
    Plnbez: 'CC001',
    Plnnr: "50001654",
    Verid: "0005",
    Vgw01: "80000",
    Vornr: "0020",
    Werks: "1001",
    Bmsch: "1000.0"
  }
];


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
const OrdenProduccion = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <NavigationBar />
        <Paper elevation={3} className={classes.SearchPaper}>
          <TextField 
            id="outlined-textarea"
            label="Busqueda"
            placeholder="Busqueda..."
            variant="outlined"
            className={classes.SearchImput}
          />
          <Button
            variant="contained"
            color="default"
            className={classes.SearchButton}
            startIcon={<Search />}
          >
            Buscar
          </Button>
        </Paper>
      </Grid>
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
      <Componentes/>
    </Grid>
  );
};

export default OrdenProduccion;
