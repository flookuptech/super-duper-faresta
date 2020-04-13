import React from "react";
import TextField from "@material-ui/core/TextField";

const Date = ({ name, label, value, onChange, type }) => {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <TextField
        value={value}
        onChange={onChange}
        type={type}
        id={name}
        name={name}
        fullWidth
        variant="outlined"
        margin="dense"
      />
    </div>
  );
};

export default Date;