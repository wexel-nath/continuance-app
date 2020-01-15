import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import CompanyDetails from "./CompanyDetails";
import { getCompanyList } from "../../api/continuance";
import { SelectInput } from "../helper/formHelpers";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  }
}));

const getCompanyOptions = companies => {
  const options = [
    { value: "new", label: "Add new company" },
    { value: "none", label: "I'm not sure" }
  ];

  return options.concat(
    companies.map(company => ({
      value: company.companyId,
      label: company.companyName
    }))
  );
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
    getCompanies();
  }, []);

  return companies;
};

const CompanyPosition = ({ formValues, expertise }) => {
  const classes = useStyles();
  const companies = useCompanies();

  return (
    <Paper className={classes.paper}>
      <h3 className="ui header">Company Details</h3>
      <SelectInput
        label="Company"
        name="companySelector"
        placeholder="Select a Company"
        options={getCompanyOptions(companies)}
        formValues={formValues}
      />
      {formValues.values.companySelector === "new" && (
        <CompanyDetails
          header="New Company"
          formValues={formValues}
          expertise={expertise}
        />
      )}
    </Paper>
  );
};

export default CompanyPosition;
