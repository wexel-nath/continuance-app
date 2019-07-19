import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import CompanyDetails from "./CompanyDetails";
import { handleGetCompanyList } from "../../actions";
import {
  renderTextInput,
  renderOptionSelectInput
} from "../helper/formHelpers";

class CompanyPosition extends React.Component {
  componentDidMount() {
    window.$(".ui.dropdown").dropdown();
    this.props.handleGetCompanyList();
  }

  renderCompanyList() {
    const companyList = [
      { companyName: "Add new company", companyId: "new" },
      ...this.props.companies,
      { companyName: "I'm not sure", companyId: "none" }
    ];
    return companyList.map(company => {
      return (
        <option key={company.companyId} value={company.companyId}>
          {company.companyName}
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
            name="companySelector"
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

const mapStateToProps = ({ form, companies }, ownProps) => {
  const formName = form[ownProps.form] || {};
  const values = formName.values || {};
  return {
    selectedCompany: values.companySelector || "",
    companies: companies
  };
};

const connectFunc = connect(
  mapStateToProps,
  { handleGetCompanyList }
)(CompanyPosition);

export default reduxForm()(connectFunc);
