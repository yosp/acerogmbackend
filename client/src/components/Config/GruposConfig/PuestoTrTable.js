import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import { Pageview } from "@material-ui/icons";
import { GlobalContex } from "../../../context/GlobalState";
import { getPtrGrupos } from "../../../context/Api";

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

const PuestoTrTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const aceroContext = useContext(GlobalContex);
  const { setGrupoPtrId, setToogleGrupo } =  aceroContext

  const columns = [
    {
      id: "Id",
      label: "Id",
      minWidth: "100",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "PtrSap",
      label: "Código Sap",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Ptr",
      label: "Puesto de trabajo",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Id",
      label: "Grupos",
      minWidth: "170",
      align: "left",
      format: (value) => (
        <Button data-Id={value} onClick={handleGrupo}>
          {" "}
          <Pageview />{" "}
        </Button>
      ),
    },
  ];

  const handleGrupo = (e) => {
    let id = e.currentTarget.dataset.id
    setGrupoPtrId(id)
    setToogleGrupo(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getPtrGrupos((err, data) => {
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
    <Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        wrap="nowrap"
      >
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PuestoTrTable;
