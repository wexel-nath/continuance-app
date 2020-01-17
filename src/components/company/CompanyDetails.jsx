import React from "react";

import { Input, SearchSelect } from "../helper/formHelpers";

const CompanyDetails = ({ formValues, expertise }) => {
  return (
    <div>
      <Input
        label="Company Name"
        name="companyName"
        required
        type="text"
        formValues={formValues}
      />
      <Input
        label="Company Website"
        name="companyWebsite"
        type="text"
        formValues={formValues}
      />
      <SearchSelect
        freeSolo
        label="Company Expertise"
        name="companyExpertise"
        options={expertise}
        formValues={formValues}
      />
      <Input
        label="Company Description"
        name="companyDescription"
        rows="2"
        formValues={formValues}
      />
    </div>
  );
};

export default CompanyDetails;
