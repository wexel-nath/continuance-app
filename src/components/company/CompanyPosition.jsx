import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import CompanyDetails from "./CompanyDetails";
import {
  renderTextInput,
  renderOptionSelectInput
} from "../helper/formHelpers";

class CompanyPosition extends React.Component {
  componentDidMount() {
    window.$(".ui.dropdown").dropdown();
  }

  renderCompanyList() {
    const companyList = [
      { name: "Add new company", id: "new" },
      ...this.props.companies,
      { name: "I'm not sure", id: "none" }
    ];
    return companyList.map(company => {
      return (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      );
    });
  }

  renderCompanyDetails() {
    const { selectedCompany, form } = this.props;
    if (selectedCompany === "new") {
      return <CompanyDetails header="New Company" form={form} />;
    }
    return null;
  }

  render() {
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
            name="company"
            label="Company"
            className="ui dropdown"
            placeholder="Select a Company"
            options={this.renderCompanyList()}
            component={renderOptionSelectInput}
          />
        </div>
        {this.renderCompanyDetails()}
      </div>
    );
  }
}

const mapStateToProps = ({ form }, ownProps) => {
  const formName = form[ownProps.form] || {};
  const values = formName.values || {};
  return {
    selectedCompany: values.company || "",
    companies: []
  };
};

const connectFunc = connect(mapStateToProps)(CompanyPosition);

export default reduxForm()(connectFunc);
