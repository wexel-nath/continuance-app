import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import { Input, SelectInput } from "../helper/formHelpers";
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
    getExpertise();
  }, []);

  return expertise;
};

const CompanyDetails = ({ formValues }) => {
  const expertise = useExpertise();
  const expertiseOptions = expertise.map(e => ({
    value: e,
    label: e
  }));

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
      <SelectInput
        label="Company Expertise"
        multiple
        name="companyExpertise"
        options={expertiseOptions}
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
