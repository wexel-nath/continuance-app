import React from "react";

import PageTitle from "../../components/helper/PageTitle";
import UploadContactsForm from "../../components/contacts/UploadContactsForm";

const UploadContacts = () => {
  return (
    <div className="ui container">
      <PageTitle title="Upload Contacts" icon="cloud upload" />
      <UploadContactsForm />
    </div>
  );
};

export default UploadContacts;
