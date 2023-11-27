"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {
  Data,
  EnhancedTableHead,
  EnhancedTableToolbar,
  Order,
  getComparator,
  stableSort,
} from "@/lib/utils";
import { onCreate, onEdit, onGenerarPdf, onSearch } from "@/lib/db.api";
import FormDialog from "@/components/FormDialog";
import { on } from "events";

function Main() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("title");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    onSearch()
      .then((data) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const [openItemDialog, setOpenItemDialog] = React.useState(false);
  const [openCreateItemDialog, setOpenCreateItemDialog] = React.useState(false);
  const [focusedItem, setFocusedItem] = React.useState<Data | null>(null);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    setOpenItemDialog(true);
    setFocusedItem(rows.find((item) => item.id === id) || null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <main className="p-4">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar selected={selected} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      {/* <TableCell align="right">{row.id}</TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.author}</TableCell>
                      <TableCell align="right">{row.publicationYear}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.ISBN}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Button
        onClick={() => {
          onGenerarPdf()
            .then((data) => {
              console.log(data);
              const blob = new Blob([data], { type: "application/pdf" });
              const url = window.URL.createObjectURL(blob);
              window.open(url);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {"Generar PDF"} 
      </Button>

      <Button onClick={() => setOpenCreateItemDialog(true)}>
        {"Nuevo Libro"}
      </Button>

      <FormDialog
        mode={"edit"}
        open={openItemDialog}
        onClose={() => {
          setOpenItemDialog(false);
          setFocusedItem(null);
        }}
        onOpen={() => setOpenItemDialog(!openItemDialog)}
        initialData={focusedItem}
        onAction={() => {
          onEdit(focusedItem);
        }}
      />
      <FormDialog
        mode={"create"}
        open={openCreateItemDialog}
        onClose={() => {
          setOpenCreateItemDialog(false);
        }}
        onOpen={() => setOpenItemDialog(!openCreateItemDialog)}
        onAction={(data: any) => {
          onCreate(data);
        }}
      />
    </main>
  );
}

export default Main;
