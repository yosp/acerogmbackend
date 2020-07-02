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
import moment from "moment";

import { GlobalContex } from "../../context/GlobalState";
import PosSubTitle from "./PosSubTitle";

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
const PosTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const AceroContex = useContext(GlobalContex);
  const { notifPos, ActiveNotifId } = AceroContex;
  let display = null;

  const columns = [
    {
      id: "Material",
      label: "Material",
      minWidth: "175",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "centro",
      label: "Centro",
      minWidth: "175",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "almacen",
      label: "Almacen",
      minWidth: "195",
      align: "left",
      format: (value) => moment(value.toLocaleString()).format("L"), //value.toLocaleString()
    },
    {
      id: "batch",
      label: "Lote",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Clmv",
      label: "Clmv",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "cant",
      label: "Cantidad",
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
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (
      ActiveNotifId !== null &&
      ActiveNotifId !== undefined &&
      notifPos !== null &&
      notifPos !== undefined
    ) {
      rows = notifPos.filter((pos) => {
        return pos.hid == ActiveNotifId;
      });
    }
  }, [ActiveNotifId, notifPos]);

  if (ActiveNotifId) {
    display = (
      <>
        <PosSubTitle />
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
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  } else {
    display = <div></div>;
  }
  return <>{display}</>;
};

export default PosTable;
