import React from "react";
import Dropdown from "../ui/Dropdown";
import DropdownItem from "../ui/DropdownItem";

class CompanyDetails extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">{this.props.header}</h3>
        <div className="two fields">
          <div className="field">
            <label>Company Name</label>
            <input type="text" name="company-name" placeholder="Wexel" />
          </div>
          <div className="field">
            <label>Company Website</label>
            <input
              type="text"
              name="company-website"
              placeholder="https://www.getwexel.com"
            />
          </div>
        </div>
        <div className="field">
          <label>Skills</label>
          <Dropdown
            className="ui multiple selection dropdown"
            placeholder="You can select multiple"
          >
            <DropdownItem text="Distributor" />
            <DropdownItem text="Sales Agent" />
            <DropdownItem text="Production Company" />
          </Dropdown>
        </div>
        <div className="field">
          <label>Company Description</label>
          <textarea
            rows="3"
            name="company-description"
            placeholder="Optional description"
          />
        </div>
      </div>
    );
  }
}

export default CompanyDetails;
