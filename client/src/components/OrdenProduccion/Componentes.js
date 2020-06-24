import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  // TextField,
  // Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";

const columns = [
  {
    id: "id",
    label: "id",
    minWidth: "100",
    align: "left",
    format: value => value.toLocaleString() //toFixed(2),
  },
  {
    id: "Aufnr",
    label: "Aufnr",
    minWidth: "100",
    align: "left",
    format: value => value.toLocaleString() //toFixed(2),
  },
  {
    id: "Meins",
    label: "Meins",
    minWidth: "170",
    align: "left",
    format: value => value.toLocaleString()
  },
  {
    id: "Idnrk",
    label: "Idnrk",
    minWidth: "170",
    align: "left",
    format: value => value.toLocaleString()
  }
]

const rows = [
  {
    id: 1,
    Idnrk: "PLQ-010",
    Aufnr: "294633",
    Meins: "TO"
  },
  {
    id: 2,
    Idnrk: "PLQ-011",
    Aufnr: "294633",
    Meins: "TO"
  },
  {
    id: 3,
    Idnrk: "PLQ-013",
    Aufnr: "294633",
    Meins: "TO"
  },
  {
    id: 4,
    Idnrk: "PLQ-045",
    Aufnr: "294633",
    Meins: "TO"
  },
  {
    id: 5,
    Idnrk: "AT-061",
    Aufnr: "294633",
    Meins: "QQ"
  },
  {
    id: 6,
    Idnrk: "CPC-002",
    Aufnr: "294633",
    Meins: "ST"
  },
  {
    id: 7,
    Idnrk: "PLQ-020",
    Aufnr: "294633",
    Meins: "TO"
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

const Componentes = () => {
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
