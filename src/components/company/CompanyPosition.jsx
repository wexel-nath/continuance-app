import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import CompanyDetails from "./CompanyDetails";
import { getCompanyList } from "../../api/continuance";
import { Input, SelectInput } from "../helper/formHelpers";

const getCompanyOptions = companies => {
  const companyList = [
    { companyName: "Add new company", companyId: "new" },
    ...companies,
    { companyName: "I'm not sure", companyId: "none" }
  ];
  return companyList.map(company => {
    return (
      company.companyName && (
        <option key={company.companyId} value={company.companyId}>
          {company.companyName}
        </option>
      )
    );
  });
};

const useCompanies = () => {
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    const {
      data: { data }
    } = await getCompanyList();

    if (data) {
      setCompanies(toCamelCase(data));
    }
  };

  useEffect(() => {
    window.$(".ui.dropdown").dropdown();
    getCompanies();
  }, []);

  return companies;
};

const CompanyPosition = ({ formValues }) => {
  const companies = useCompanies();

  return (
    <div className="ui segment">
      <h3 className="ui header">Company Position</h3>
      <div className="two fields">
        <Input
          label="Position"
          name="companyPosition"
          placeholder="Agent"
          type="text"
          formValues={formValues}
        />
        <SelectInput
          label="Company"
          name="companySelector"
          placeholder="Select a Company"
          options={getCompanyOptions(companies)}
          formValues={formValues}
        />
      </div>
      {formValues.values.companySelector === "new" && (
        <CompanyDetails header="New Company" formValues={formValues} />
      )}
    </div>
  );
};

export default CompanyPosition;
