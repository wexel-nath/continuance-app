import React from "react";
import { Field, reduxForm } from "redux-form";

class CompanyDetails extends React.Component {
  componentDidMount() {
    window.$(".ui.dropdown").dropdown();
  }

  renderTextInput({ input, label, placeholder, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type="text" placeholder={placeholder} />
      </div>
    );
  }

  renderTextAreaInput({ input, label, placeholder, rows }) {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea {...input} rows={rows} placeholder={placeholder} />
      </div>
    );
  }

  renderExpertiseList() {
    let expertiseList = ["Distributor", "Sales Agent", "Production Company"];
    return expertiseList.map((expertise, i) => {
      return (
        <option key={i} className="item" value={expertise}>
          {expertise}
        </option>
      );
    });
  }

  renderExpertiseSelector = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field">
        <label>Company Expertise</label>
        <select className="ui multiple selection dropdown" {...input}>
          <option value="">You can select multiple</option>
          {this.renderExpertiseList()}
        </select>
      </div>
    );
  };

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">{this.props.header}</h3>
        <div className="two fields">
          <Field
            name="company_name"
            label="Company Name"
            placeholder="Wexel"
            component={this.renderTextInput}
          />
          <Field
            name="company_website"
            label="Company Website"
            placeholder="https://www.getwexel.com"
            component={this.renderTextInput}
          />
        </div>
        <Field
          name="company_expertise"
          component={this.renderExpertiseSelector}
        />
        <Field
          name="company_description"
          label="Company Description"
          placeholder="Optional description"
          component={this.renderTextAreaInput}
        />
      </div>
    );
  }
}

export default reduxForm()(CompanyDetails);
