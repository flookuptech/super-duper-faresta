import React, { Fragment } from "react";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";
import { CSVLink } from "react-csv";

const styles = {
  root: {
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 650,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
  }, 
  text: {
    textDecoration: 'none' 
  }
};

const CsvErrors = ({ errors }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const downloadFileHeaders = [
    { label: "Error Message", key: "errorMessage"},
    { label: "Current Value", key: "currentValue"},
    { label: "Row No", key: "rowNo"},
    { label: "Column Name", key: "columnName"}
  ];

  const downloadFileData = errors.map((err) => {
    return(
      {errorMessage: err.message.replace("[0].",''),
        currentValue: err.type === "any.required" ? "None" : err.context.value,
        rowNo: err.path[0] + 1, columnName: err.path[1]
      }
    );
  })
  
  return (
    <Fragment>
      {console.log(errors)}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography component="h5" variant="h5">
            Error logs
          </Typography><br />
        </Grid>
        <Grid item>
          <CSVLink
            data={downloadFileData}
            style={styles.text}
            headers={downloadFileHeaders}
            filename={"FAR_ErrorLogs.csv"}
          >
            <Button
              className="button-font-style"
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "red"
              }}
            >
              Download Logs
            </Button>
          </CSVLink>
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6">
        Total Number of Errors: {errors.length}
      </Typography><br />
      <Typography component="h6" variant="h6">
        Error color codes:
      </Typography>
      <ul>
        <li style={{fontSize: 20}}>
          <Typography style={{fontSize: 18, color: '#E51A17', fontWeight: "bold"}}>Data Required</Typography>
        </li>
        <li style={{fontSize: 20}}>
          <Typography style={{fontSize: 18, color: '#fca001', fontWeight: "bold"}}>Invalid Data</Typography>
        </li>
      </ul> <br />
      <TableContainer style={styles.container} component={Paper}>
        <Table stickyHeader style={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={styles.tableHeader}>
                Error No 
              </TableCell>
              <TableCell align="left" style={styles.tableHeader}>
                Error Message
              </TableCell>  
              <TableCell align="left" style={styles.tableHeader}>
                Current Value
              </TableCell>
              <TableCell align="left" style={styles.tableHeader}>
                Row No
              </TableCell>
              <TableCell align="left" style={styles.tableHeader}>
                Column Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {errors
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((err, i) => {
              return (
                <React.Fragment>
                  <TableRow key={err.message}>
                    <TableCell align="left" component="th" scope="row">
                      {page*5 +(i+1)}
                    </TableCell>
                    { err.type === "any.required" ? 
                      <TableCell align="left" style={{color: '#E51A17', fontWeight: "bold"}}>{err.message.replace("[0].",'')}</TableCell>
                      :
                      err.type === "object.unknown" ?
                      <TableCell align="left" style={{color: '#fca001', fontWeight: "bold"}}>{err.message.replace("[0].",'')}</TableCell>
                      :
                      <TableCell align="left">{err.message.split("[0].")}</TableCell>
                    }
                    {err.type === "any.required" ? 
                      <TableCell align="left">None</TableCell>
                      :<TableCell>{err.context.value}</TableCell>}
                    <TableCell align="left">{err.path[0] + 1}</TableCell>
                    <TableCell align="left">{err.path[1]}</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10,  20, 100]}
        component="div"
        count={errors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default CsvErrors;