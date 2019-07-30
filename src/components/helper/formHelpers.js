import React from "react";
import { Creatable } from "react-select";

import LocationSearchInput from "./LocationSearchInput";

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

export const DisabledTextArea = ({ label, value }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea className="ui disabled input" rows="2" defaultValue={value} />
    </div>
  );
};
