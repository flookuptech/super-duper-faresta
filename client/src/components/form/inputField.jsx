import React, { Fragment } from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  cardStyle: {
    backgroundColor: "#d9534f",
    color: "white",
    height: 20,
    padding: "5px"
  }
});

const Input = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  type,
  autoFocus,
  required,
  size,
  helperText,
  InputProps,
  className,
  margin,
  defaultValue
}) => {
  const classes = useStyles();

  return (
    <div className="">
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        autoFocus={autoFocus}
        fullWidth
        variant="outlined"
        margin={margin}
        label={label}
        required={required}
        size={size}
        helperText={helperText}
        InputProps={InputProps}
        className={className}
        defaultValue={defaultValue}
      />
      {error && (
        <Fragment>
          <br />
          <Card className={classes.cardStyle}>{error}</Card>
          <br />
        </Fragment>
      )}
    </div>
  );
};

export default Input;
