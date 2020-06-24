import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

const columns = [
  {
    id: "Centro",
    label: "Centro",
    minWidth: "175",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Almacen",
    label: "Almacen",
    minWidth: "175",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "clmv",
    label: "clmv",
    minWidth: "195",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Cant",
    label: "Cant",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "UndMed",
    label: "Und Medida",
    minWidth: "170",
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Batch",
    label: "Batch",
    minWidth: "170",
    align: "center",
    format: (value) => value.toLocaleString(),
  },
];

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

const NotifPos = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
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

export default NotifPos;
