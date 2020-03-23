import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";

import InputField from "components/form/inputField";
import { SelectField } from "components/form/select";
import {MultipleSelect} from "components/form/multiSelect";


class userDataFields extends Component {
  state = {};

  render() {
    const role = [
      {
        value: "junior",
        label: "Junior"
      },
      {
        value: "auditor",
        label: "Auditor"
      }
    ];

    const { onChange, onSubmit} = this.props;
    return (
      <form onSubmit={onSubmit}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="email"
                label="Email"
                type="email"
                name="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="contact"
                label="Contact"
                name="contact"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="designation"
                label="Designation"
                name="designation"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="panNumber"
                label="Pan number"
                name="panNumber"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} className="select-button-padding">
              <SelectField
                onChange={onChange}
                options={role}
                label="Role"
                name="role"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className="button-font-style"
                >
                  Register User
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}

export default userDataFields;
