import React from "react";
import { Field, reduxForm } from "redux-form";

import {
  renderTextInput,
  renderTextAreaInput,
  renderOptionSelectInput
} from "../helper/formHelpers";

class CompanyDetails extends React.Component {
  componentDidMount() {
    window.$(".ui.dropdown").dropdown();
  }

  renderExpertiseList() {
    const expertiseList = ["Distributor", "Sales Agent", "Production Company"];
    return expertiseList.map((expertise, index) => {
      return (
        <option className="item" key={index} value={expertise}>
          {expertise}
        </option>
      );
    });
  }

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">{this.props.header}</h3>
        <div className="two fields">
          <Field
            component={renderTextInput}
            label="Company Name"
            name="companyName"
            placeholder="Wexel"
          />
          <Field
            component={renderTextInput}
            label="Company Website"
            name="companyWebsite"
            placeholder="https://www.getwexel.com"
          />
        </div>
        <Field
          className="ui multiple selection dropdown"
          component={renderOptionSelectInput}
          label="Company Expertise"
          name="companyExpertise"
          placeholder="You can select multiple"
          options={this.renderExpertiseList()}
        />
        <Field
          component={renderTextAreaInput}
          label="Company Description"
          name="companyDescription"
          placeholder="Optional description"
          rows="2"
        />
      </div>
    );
  }
}

export default reduxForm()(CompanyDetails);
