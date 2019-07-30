import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import {
  Input,
  MultipleSelectInput,
  TextAreaInput
} from "../helper/formHelpers";
import { getExpertiseList } from "../../api/continuance";

const useExpertise = () => {
  const [expertise, setExpertise] = useState([]);

  const getExpertise = async () => {
    const {
      data: { data }
    } = await getExpertiseList();

    if (data) {
      setExpertise(toCamelCase(data));
    }
  };

  useEffect(() => {
    window.$(".ui.dropdown").dropdown();
    getExpertise();
  }, []);

  return expertise;
};

const CompanyDetails = ({ header, formValues }) => {
  const expertise = useExpertise();
  const expertiseOptions = expertise.map(e => {
    return {
      value: e,
      label: e
    };
  });

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
        options={expertiseOptions}
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
