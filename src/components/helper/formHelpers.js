import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import { getCountryList } from "../../api/countries";

const useStyles = makeStyles(theme => ({
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

export const SelectInput = ({ label, name, options, formValues }) => {
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

  const value = formValues.values[name] || "";

  return (
    <FormControl variant="outlined" className={classes.select} margin="normal">
      <InputLabel ref={inputLabel} id={labelId}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        labelWidth={labelWidth}
        name={name}
        value={value}
        onChange={formValues.handleChange}
      >
        {items}
      </Select>
    </FormControl>
  );
};

export const SearchSelect = ({
  formValues,
  freeSolo,
  getOptionLabel,
  label,
  name,
  options,
  single
}) => {
  const onChange = (event, action) => {
    event.target.name = name;
    event.target.action = action;
    formValues.handleChange(event);
  };

  return (
    <Autocomplete
      onChange={onChange}
      onKeyPress={e => e.key === "Enter" && e.preventDefault()}
      name={name}
      options={options}
      disableCloseOnSelect={!single}
      filterSelectedOptions
      freeSolo={freeSolo}
      getOptionLabel={getOptionLabel}
      multiple={!single}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          margin="normal"
          fullWidth
        />
      )}
    />
  );
};

export const RatingInput = ({ name, formValues }) => {
  const onChange = (event, action) => {
    event.target.name = name;
    event.target.action = action;
    formValues.handleChange(event);
  };

  return (
    <Rating
      name={name}
      value={formValues.values[name] || 0}
      onChange={onChange}
    />
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
