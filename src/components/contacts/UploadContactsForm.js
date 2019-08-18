import React, { useState } from "react";

import { uploadContacts } from "../../api/continuance";

import "./UploadContactsForm.css";

const useFile = () => {
  const [file, setFile] = useState(null);

  const handleChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    uploadContacts(file);
  };

  return [handleChange, handleSubmit];
};

const UploadContactsForm = () => {
  const [handleChange, handleSubmit] = useFile();

  return (
    <div className="ui segment">
      <h3 className="ui header">Upload a CSV</h3>
      <form className="ui form" onSubmit={handleSubmit}>
        <input className="file-input" type="file" onChange={handleChange} />
        <button className="ui primary button" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadContactsForm;
