import React from "react";
import ContactDetails from "./ContactDetails";
import CompanyPosition from "../company/CompanyPosition";

class NewContact extends React.Component {
  render() {
    return (
      <div className="ui container">
        <h2 className="ui header">
          <i className="address card outline icon blue" />
          Add New Contact
        </h2>
        <form className="ui form">
          <ContactDetails />
          <CompanyPosition />

          {/* TODO: enable button when required fields are filled */}
          <button className="ui disabled blue button" type="submit">
            Create New Contact
          </button>
        </form>
      </div>
    );
  }
}

export default NewContact;
