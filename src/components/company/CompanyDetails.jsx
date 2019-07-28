import React, { useEffect } from "react";

import {
  Input,
  MultipleSelectInput,
  TextAreaInput
} from "../helper/formHelpers";

const getExpertiseOptions = () => {
  // todo: get expertise list from continuance
  const expertiseList = ["Distributor", "Sales Agent", "Production Company"];
  return expertiseList.map((expertise, index) => {
    return (
      <option className="item" key={index} value={expertise}>
        {expertise}
      </option>
    );
  });
};

const CompanyDetails = ({ header, formValues }) => {
  useEffect(() => {
    window.$(".ui.dropdown").dropdown();
  }, []);

  return (
    <div className="ui segment">
      <h3 className="ui header">{header}</h3>
      <div className="two fields">
        <Input
          label="Company Name"
          name="companyName"
          placeholder="Wexel"
          type="text"
          formValues={formValues}
        />
        <Input
          label="Company Website"
          name="companyWebsite"
          placeholder="https://www.getwexel.com"
          type="text"
          formValues={formValues}
        />
      </div>
      <MultipleSelectInput
        label="Company Expertise"
        name="companyExpertise"
        placeholder="You can select multiple"
        options={getExpertiseOptions()}
        formValues={formValues}
      />
      <TextAreaInput
        label="Company Description"
        name="companyDescription"
        placeholder="Optional description"
        rows="2"
        formValues={formValues}
      />
    </div>
  );
};

export default CompanyDetails;
