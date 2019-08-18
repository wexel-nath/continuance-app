import React, { useState } from "react";

import { uploadContacts } from "../../api/continuance";

import "./UploadContactsForm.css";

const useFile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    await uploadContacts(file);
    setLoading(false);
  };

  return [loading, handleChange, handleSubmit];
};

const UploadContactsForm = () => {
  const [loading, handleChange, handleSubmit] = useFile();

  return (
    <div className="ui segment">
      <h3 className="ui header">Upload a CSV</h3>
      <form
        className={`ui ${loading && "loading"} form`}
        onSubmit={handleSubmit}
      >
        <input className="file-input" type="file" onChange={handleChange} />
        <button className="ui primary button" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadContactsForm;
