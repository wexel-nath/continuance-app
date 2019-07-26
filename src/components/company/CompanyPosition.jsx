import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { camelizeKeys as toCamelCase } from "humps";

import CompanyDetails from "./CompanyDetails";
import { getCompanyList } from "../../api/continuance";
import {
  renderTextInput,
  renderOptionSelectInput
} from "../helper/formHelpers";

const getCompanyOptions = companies => {
  const companyList = [
    { companyName: "Add new company", companyId: "new" },
    ...companies,
    { companyName: "I'm not sure", companyId: "none" }
  ];
  return companyList.map(company => {
    return (
      <option key={company.companyId} value={company.companyId}>
        {company.companyName}
      </option>
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

const CompanyPosition = ({ selectedCompany, form }) => {
  const companies = useCompanies();
  return (
    <div className="ui segment">
      <h3 className="ui header">Company Position</h3>
      <div className="two fields">
        <Field
          name="companyPosition"
          label="Position"
          placeholder="Agent"
          component={renderTextInput}
        />
        <Field
          name="companySelector"
          label="Company"
          className="ui dropdown"
          options={getCompanyOptions(companies)}
          component={renderOptionSelectInput}
        />
      </div>
      {selectedCompany === "new" && (
        <CompanyDetails header="New Company" form={form} />
      )}
    </div>
  );
};

const mapStateToProps = ({ form }, ownProps) => {
  const formName = form[ownProps.form] || {};
  const values = formName.values || {};
  return {
    selectedCompany: values.companySelector || ""
  };
};

const connectFunc = connect(mapStateToProps)(CompanyPosition);

export default reduxForm()(connectFunc);
