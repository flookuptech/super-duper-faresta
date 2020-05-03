import React, { Component } from "react";
import { withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Switch from "components/switch";

const styles = {
  table: {
    minWidth: 1150
  },

  tableHeader: {
    fontWeight: "bold",
    fontSize: 16
  }
};

class TenantTable extends Component {
  render() {
    const { tenantList, classes, handleChange } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader}>
                Company Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Organization Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Admin Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Admin Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Contact
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Pan Number
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Date registered
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenantList.map(function(item, i) {
              return (
                <React.Fragment>
                  <TableRow key={item._id}>
                    <TableCell component="th" sope="row" align="center">
                      {item.companyName}
                    </TableCell>
                    <TableCell align="center">
                      <a href={"mailto:" + item.orgEmail}>{item.orgEmail}</a>
                    </TableCell>
                    <TableCell component="th" sope="row" align="center">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      <a href={"mailto:" + item.email}>{item.email}</a>
                    </TableCell>
                    <TableCell align="center">{item.contact}</TableCell>
                    <TableCell align="center">{item.panNumber}</TableCell>
                    <TableCell align="center">
                      {item.dateCreated.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        onChangeHandler={() => handleChange(item)}
                        checked={item.status}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default withStyles(styles)(TenantTable);
