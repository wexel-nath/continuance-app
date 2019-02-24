import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import CompanyDetails from "./CompanyDetails";

class CompanyPosition extends React.Component {
  componentDidMount() {
    window.$(".ui.dropdown").dropdown();
  }

  renderCompanyList() {
    let companyList = [
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

  renderCompanySelector = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field">
        <label>Company</label>
        <select className="ui dropdown" {...input}>
          <option value="">Select a Company</option>
          {this.renderCompanyList()}
        </select>
      </div>
    );
  };

  renderPositionInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field">
        <label>Position</label>
        <input type="text" {...input} placeholder="Agent" />
        {error && touched && (
          <div className="ui pointing red basic label">{error}</div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">Company Position</h3>
        <div className="two fields">
          <Field name="position" component={this.renderPositionInput} />
          <Field name="company" component={this.renderCompanySelector} />
        </div>

        {this.props.selectedCompany === "new" && (
          <CompanyDetails header="New Company" form={this.props.form} />
        )}
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
