import React from "react";
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export function SelectField({ onChange, options, label, name}) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const classes = useStyles();

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
        fullWidth
        required
      >
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            {label}
        </InputLabel>
        <Select
          onChange={onChange}
          name={name}
          labelWidth={labelWidth}
          required
        >
          {options.map(item => {
            return <MenuItem value={item.value}>{item.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}