import React from "react";
import LocationSearchInput from "./LocationSearchInput";

class ContactDetails extends React.Component {
  state = {
    suggestions: []
  };

  buildSuggestionList() {
    return this.state.suggestions.map((suggestion, index) => {
      return (
        <div key={index} className="item">
          {suggestion}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">Contact Details</h3>
        <div className="three fields">
          <div className="field">
            <label>First Name</label>
            <input type="text" name="first-name" placeholder="Thomas" />
          </div>
          <div className="field">
            <label>Middle Name</label>
            <input type="text" name="middle-name" placeholder="Bang" />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input type="text" name="last-name" placeholder="Alter" />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Contact Number</label>
            <input type="text" name="phone" placeholder="0412 345 678" />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input type="text" name="email" placeholder="thomas@example.com" />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Based in</label>
            <LocationSearchInput />
          </div>
          <div className="field">
            <label>Location Met</label>
            <LocationSearchInput />
          </div>
        </div>
        <div className="field">
          <label>Notes</label>
          <textarea
            rows="2"
            name="contact-notes"
            placeholder="Optional notes"
          />
        </div>
      </div>
    );
  }
}

export default ContactDetails;
