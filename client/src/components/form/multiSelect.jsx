import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export function MultipleSelect({ tags, handleOnChange }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [tagValue, setPersonName] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
      <FormControl
        variant="outlined"
        size="small"
        fullWidth
        required
        className={classes.formControl}
      >
        <InputLabel ref={inputLabel} id="demo-mutiple-checkbox-label">
          Tag
        </InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          name="tagValue"
          value={tagValue}
          labelWidth={labelWidth}
          onChange={handleOnChange}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {tags.map(tag => (
            <MenuItem key={tag} value={tag}>
              <Checkbox checked={tagValue && tagValue.indexOf(tag) > -1} />
              <ListItemText primary={tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}