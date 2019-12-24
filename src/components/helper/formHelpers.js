import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import LocationSearchInput from "./LocationSearchInput";

const useStyles = makeStyles(theme => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  select: {
    margin: "normal",
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonProgress: {
    color: green[500],
    position: "absolute"
  }
}));

export const TextFieldInput = ({ disabled, formValues, label, name, type }) => {
  const error = formValues.errors[name] || "";
  const value = formValues.values[name] || "";

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={error}
      id={name}
      label={label}
      margin="normal"
      name={name}
      onChange={formValues.handleChange}
      required
      type={type}
      value={value}
      variant="outlined"
    />
  );
};

export const FormSubmit = ({ loading, text }) => {
  const classes = useStyles();

  return (
    <Button
      size="large"
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={loading}
    >
      {text}
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </Button>
  );
};

export const FormError = ({ error }) => (
  <Typography variant="subtitle2" color="error" align="center">
    {error}
  </Typography>
);

export const Input = ({ formValues, label, name, required, type, rows }) => {
  const error = formValues.errors[name] || "";
  const value = formValues.values[name] || "";
  return (
    <TextField
      error={!!error}
      fullWidth
      helperText={error}
      id={name}
      label={label}
      margin="normal"
      multiline={parseInt(rows) > 1}
      rows={rows || 1}
      name={name}
      onChange={formValues.handleChange}
      required={required}
      type={type}
      value={value}
      variant="outlined"
    />
  );
};

export const SelectInput = ({ label, name, options, formValues, multiple }) => {
  const classes = useStyles();
  const labelId = "select-" + name;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const items = options
    .filter(option => !!option.label)
    .map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));

  const value = formValues.values[name] || (multiple ? [] : "");
  const renderValue = selected => (
    <div className={classes.chips}>
      {selected.map(value => (
        <Chip key={value} label={value} className={classes.chip} />
      ))}
    </div>
  );

  return (
    <FormControl variant="outlined" className={classes.select} margin="normal">
      <InputLabel ref={inputLabel} id={labelId}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        labelWidth={labelWidth}
        multiple={multiple}
        name={name}
        renderValue={multiple && renderValue}
        value={value}
        onChange={formValues.handleChange}
      >
        {items}
      </Select>
    </FormControl>
  );
};

export const LocationInput = ({ label, name, formValues }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <LocationSearchInput name={name} onChange={formValues.handleChange} />
    </div>
  );
};

export const DisabledInput = ({ label, value }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="ui disabled input" type="text" defaultValue={value} />
    </div>
  );
};
