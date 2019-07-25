import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { camelizeKeys as toCamelCase } from "humps";

import CompanyDetails from "./CompanyDetails";
import { getCompanyList } from "../../api/continuance";
import {
  renderTextInput,
  renderOptionSelectInput
} from "../helper/formHelpers";

class CompanyPosition extends React.Component {
  state = {
    companies: []
  };

  async componentDidMount() {
    window.$(".ui.dropdown").dropdown();

    const {
      data: { data }
    } = await getCompanyList();

    if (data) {
      this.setState({ companies: toCamelCase(data) });
    }
  }

  renderCompanyList() {
    const companyList = [
      { companyName: "Add new company", companyId: "new" },
      ...this.state.companies,
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

  render() {
    const { selectedCompany, form } = this.props;
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
        {selectedCompany === "new" && (
          <CompanyDetails header="New Company" form={form} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ form }, ownProps) => {
  const formName = form[ownProps.form] || {};
  const values = formName.values || {};
  return {
    selectedCompany: values.companySelector || ""
  };
};

const connectFunc = connect(mapStateToProps)(CompanyPosition);

export default reduxForm()(connectFunc);
