import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import InputField from "components/form/inputField";
import { assetInfoArray } from "../../common/viewData/guiView/fieldsArray";
import Form from "components/form/form";
import { Typography, Box, Container } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PublishIcon from "@material-ui/icons/Publish";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
};

export default class CreateAsset extends Form {
  state = {
    data: {
      asset_code: "",
      description: "",
      category: "",
      quantity: "",
      vendor_name: "",
      date_of_installation: "",
      month_of_installation: "",
      invoice_number: "",
      invoice_date: "",
      total_invoice_amount: "",
      base_amount: "",
      amount_capitalised: "",
      capitalised_value: "",
      location: "",
      service_tax: "",
      vat: "",
      taxes_: "",
      other_charges: "",
      depreciation: "",
      dep_rate: "",
      dep_per_day: "",
      accumulated_depreciation: "",
      net_block: "",
      gross_block: "",
      number_of_days: "",
      useful_life_companies_act: "",
      useful_life_management: "",
      wdv_opening: "",
      wdv_closing: "",
      classification: "",
      purchase_value: ""
    },
    assetCreatedBy: ""
  };

  componentDidMount() {
    this.setState({ assetCreatedBy: this.props.user.name });
  }

  handleSubmit = async () => {
    const data = {
      ...this.state.data
    };
    const assetCreatedBy = this.state.assetCreatedBy;
    console.log(data);
    console.log(assetCreatedBy);
    toast.success("Success");
  };

  render() {
    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <main style={styles.content}>
          <Container maxWidth="lg">
            <br />
            <Box style={styles.boxBorder}>
              <div>
                <Typography component="h5" variant="h5">
                  Create Asset
                </Typography>
              </div>
              <br />
              <div>
                <Grid container spacing={3}>
                  {assetInfoArray.map(item => {
                    return (
                      <Grid item xs={6} md={4} lg={3}>
                        <InputField
                          id="standard-read-only-input"
                          helperText={item.helperText}
                          name={item.value}
                          onChange={this.handleOnChange}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <br />
                <Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="button-font-style"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Box>
            <br />
          </Container>
        </main>
      </Fragment>
    );
  }
}
