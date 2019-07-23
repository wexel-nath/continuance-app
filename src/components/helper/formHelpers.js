import React from "react";

import LocationSearchInput from "./LocationSearchInput";

export const renderTextInput = ({
  input,
  label,
  meta: { error, touched },
  placeholder,
  type
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input type={type || "text"} {...input} placeholder={placeholder} />
      {error && touched && (
        <div className="ui pointing red basic label">{error}</div>
      )}
    </div>
  );
};

export const renderTextAreaInput = ({ input, label, placeholder, rows }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea {...input} placeholder={placeholder} rows={rows} />
    </div>
  );
};

export const renderLocationInput = ({ input, label, name }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <LocationSearchInput input={input} name={name} />
    </div>
  );
};

export const renderOptionSelectInput = ({
  className,
  input,
  label,
  options,
  placeholder
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <select className={className} {...input}>
        <option value="">{placeholder}</option>
        {options}
      </select>
    </div>
  );
};

export const renderDisabledInput = (label, value) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        className="ui disabled input"
        onChange={() => {}}
        type="text"
        value={value}
      />
    </div>
  );
};

export const renderDisabledTextArea = (label, value) => {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        className="ui disabled input"
        onChange={() => {}}
        rows="2"
        type="text"
        value={value}
      />
    </div>
  );
};
