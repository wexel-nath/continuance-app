import React from "react";
import { Creatable } from "react-select";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import LocationSearchInput from "./LocationSearchInput";

const useStyles = makeStyles(theme => ({
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

export const Input = ({ label, name, placeholder, type, formValues }) => {
  const error = formValues.errors[name] || "";
  const value = formValues.values[name] || "";
  return (
    <div className="field">
      <label>{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        onChange={formValues.handleChange}
        type={type}
        value={value}
      />
      {error && <div className="ui pointing red basic label">{error}</div>}
    </div>
  );
};

export const TextAreaInput = ({
  label,
  name,
  placeholder,
  rows,
  formValues
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={formValues.handleChange}
        rows={rows}
        value={formValues.values[name] || ""}
      />
    </div>
  );
};

export const SelectInput = ({
  label,
  name,
  placeholder,
  options,
  formValues
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <select
        className="ui dropdown"
        name={name}
        onChange={formValues.handleChange}
      >
        <option value="">{placeholder}</option>
        {options}
      </select>
    </div>
  );
};

export const MultipleSelectInput = ({
  label,
  name,
  placeholder,
  options,
  formValues
}) => {
  const handleChange = name => event => {
    const newEvent = {
      value: event.map(element => element.value)
    };
    formValues.handleChange(newEvent, { name });
  };

  return (
    <div className="field">
      <label>{label}</label>
      <Creatable
        name={name}
        closeMenuOnSelect={false}
        options={options}
        isMulti
        placeholder={placeholder}
        onChange={handleChange(name)}
      />
    </div>
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
