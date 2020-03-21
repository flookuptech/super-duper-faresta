import React from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {uploadDataFieldsArray} from './uploadDataFieldsArray';

const styles = {
    table: {
        minWidth: 650,
    },

    tableHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        minWidth: 180
    }
};

class UploadDataTable extends React.Component{
    render(){
        const {data, classes} = this.props;
        return (
            <TableContainer component={Paper}>
                <Table className={styles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {uploadDataFieldsArray.map(function(item,i){
                                return(
                                <TableCell align="center" className={classes.tableHeader}>{item.value}</TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map(function(item, i) {
                        return (
                            <React.Fragment>
                                <TableRow key={item.asset_code}>
                                    <TableCell align="center">{item.asset_code}</TableCell>
                                    <TableCell align="center">{item.date_of_installation}</TableCell>
                                    <TableCell align="center">{item.month_of_installation}</TableCell>
                                    <TableCell align="center">{item.vendor_name}</TableCell>
                                    <TableCell align="center">{item.invoice_date}</TableCell>
                                    <TableCell align="center">{item.invoice_number}</TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center">{item.category}</TableCell>
                                    <TableCell align="center">{item.location}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="center">{item.base_amount}</TableCell>
                                    <TableCell align="center">{item.vat}</TableCell>
                                    <TableCell align="center">{item.service_tax}</TableCell>
                                    <TableCell align="center">{item.other_charges}</TableCell>
                                    <TableCell align="center">{item.total_invoice_amount}</TableCell>
                                    <TableCell align="center">{item.amount_capitalised}</TableCell>
                                    <TableCell align="center">{item.dep_per_day}</TableCell>
                                    <TableCell align="center">{item.dep_rate}</TableCell>
                                    <TableCell align="center">{item.number_of_days}</TableCell>
                                    <TableCell align="center">{item.depreciation}</TableCell>
                                    <TableCell align="center">{item.net_block}</TableCell>
                                    <TableCell align="center">{item.classification}</TableCell>
                                    <TableCell align="center">{item.purchase_value}</TableCell>
                                    <TableCell align="center">{item.taxes_}</TableCell>
                                    <TableCell align="center">{item.capitalised_value}</TableCell>
                                    <TableCell align="center">{item.useful_life_companies_act}</TableCell>
                                    <TableCell align="center">{item.useful_life_management}</TableCell>
                                    <TableCell align="center">{item.gross_block}</TableCell>
                                    <TableCell align="center">{item.accumulated_depreciation}</TableCell>
                                    <TableCell align="center">{item.wdv_opening}</TableCell>
                                    <TableCell align="center">{item.wdv_closing}</TableCell>
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

export default withStyles(styles)(UploadDataTable);
