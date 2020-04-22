import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  uploadDataFieldsArray,
  juniorAndAuditorFields,
} from "./uploadDataFieldsArray";
import TablePagination from "@material-ui/core/TablePagination";

const styles = {
  table: {
    minWidth: 650,
  },

  container: {
    maxHeight: 650,
  },

  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
    minWidth: 200,
  },

  tableCell: {
    backgroundColor: "#F8F8F8",
  },

  root: {
    width: "100%",
  },
};

const UploadDataTable = ({ user, data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper style={styles.root}>
      <TableContainer style={styles.container} component={Paper}>
        <Table stickyHeader aria-label="sticky table" style={styles.table}>
          <TableHead>
            <TableRow>
              {user.role === "senior" &&
                uploadDataFieldsArray.map((item) => {
                  return (
                    <TableCell align="center" style={styles.tableHeader}>
                      {item.value}
                    </TableCell>
                  );
                })}
              {(user.role === "junior" || user.role === "auditor") &&
                juniorAndAuditorFields.map((item) => {
                  return (
                    <TableCell align="center" style={styles.tableHeader}>
                      {item.value}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <Fragment>
                    <TableRow
                      tabIndex={-1}
                      key={item.asset_code}
                      style={index % 2 === 0 ? null : styles.tableCell}
                    >
                      <TableCell align="center">
                        {item.verifiedStatus ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="center">{item.asset_code}</TableCell>
                      <TableCell align="center">
                        {item.date_of_installation}
                      </TableCell>
                      <TableCell align="center">
                        {item.month_of_installation}
                      </TableCell>
                      <TableCell align="center">{item.vendor_name}</TableCell>
                      <TableCell align="center">{item.invoice_date}</TableCell>
                      <TableCell align="center">
                        {item.invoice_number}
                      </TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">{item.category}</TableCell>
                      <TableCell align="center">{item.sub_category}</TableCell>
                      <TableCell align="center">{item.location}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.base_amount}</TableCell>
                      <TableCell align="center">{item.vat}</TableCell>
                      <TableCell align="center">{item.service_tax}</TableCell>
                      <TableCell align="center">{item.other_charges}</TableCell>
                      <TableCell align="center">
                        {item.total_invoice_amount}
                      </TableCell>
                      <TableCell align="center">
                        {item.amount_capitalised}
                      </TableCell>
                      {user.role === "senior" && (
                        <Fragment>
                          <TableCell align="center">
                            {item.dep_per_day}
                          </TableCell>
                          <TableCell align="center">{item.dep_rate}</TableCell>
                        </Fragment>
                      )}
                      <TableCell align="center">
                        {item.number_of_days}
                      </TableCell>
                      {user.role === "senior" && (
                        <Fragment>
                          <TableCell align="center">
                            {item.depreciation}
                          </TableCell>
                          <TableCell align="center">{item.net_block}</TableCell>
                        </Fragment>
                      )}
                      <TableCell align="center">
                        {item.classification}
                      </TableCell>
                      <TableCell align="center">
                        {item.purchase_value}
                      </TableCell>
                      <TableCell align="center">{item.taxes_}</TableCell>
                      <TableCell align="center">
                        {item.capitalised_value}
                      </TableCell>
                      <TableCell align="center">
                        {item.useful_life_companies_act}
                      </TableCell>
                      <TableCell align="center">
                        {item.useful_life_management}
                      </TableCell>
                      <TableCell align="center">{item.gross_block}</TableCell>
                      <TableCell align="center">
                        {item.accumulated_depreciation}
                      </TableCell>
                      <TableCell align="center">{item.wdv_opening}</TableCell>
                      <TableCell align="center">{item.wdv_closing}</TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UploadDataTable;
