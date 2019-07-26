import React from "react";
import { camelizeKeys as toCamelCase } from "humps";

import PageTitle from "../../components/helper/PageTitle";
import {
  renderDisabledInput,
  renderDisabledTextArea
} from "../../components/helper/formHelpers";
import { getContactById } from "../../api/continuance";

class ViewContact extends React.Component {
  state = {
    contact: null
  };

  async componentDidMount() {
    const {
      data: { data }
    } = await getContactById(this.props.match.params.id);

    this.setState({ contact: toCamelCase(data) });
  }

  render() {
    const { contact } = this.state;
    if (!contact) {
      return <div>{/* todo: loading */}</div>;
    }
    const {
      firstName,
      lastName,
      contactPhone,
      contactEmail,
      locationBased,
      locationMet,
      companyPosition,
      companyName,
      notes
    } = contact;
    return (
      <div className="ui form container">
        <PageTitle
          title={firstName + " " + lastName}
          icon="address card outline"
        />
        <div className="ui segment">
          <div className="two fields">
            {renderDisabledInput("First Name", firstName)}
            {renderDisabledInput("Last Name", lastName)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Contact Number", contactPhone)}
            {renderDisabledInput("Email Address", contactEmail)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Based In", locationBased)}
            {renderDisabledInput("Location Met", locationMet)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Position", companyPosition)}
            {renderDisabledInput("Company", companyName)}
          </div>
          {renderDisabledTextArea("Notes", notes)}
        </div>
      </div>
    );
  }
}

export default ViewContact;
