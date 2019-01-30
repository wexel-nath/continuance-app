import React from "react";
import CompanyDetails from "./CompanyDetails";
import Dropdown from "../ui/Dropdown";
import DropdownItem from "../ui/DropdownItem";

class CompanyPosition extends React.Component {
  state = {
    company: ""
  };

  companyItem(value, text) {
    return (
      <div className="item" onClick={() => this.setState({ company: value })}>
        {text}
      </div>
    );
  }

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">Company Position</h3>
        <div className="two fields">
          <div className="field">
            <label>Position</label>
            <input type="text" name="position" placeholder="Agent" />
          </div>
          <div className="field">
            <label>Company</label>
            <Dropdown
              className="ui selection dropdown"
              name="company-id"
              placeholder="Select a Company"
              showIcon
            >
              <DropdownItem
                handleClick={() => this.setState({ company: "new" })}
                text="Add New Company"
                value="new"
              />
              <DropdownItem
                handleClick={() => this.setState({ company: "none" })}
                text="I'm not sure"
                value="none"
              />
              {/* TODO: Get list of companies */}
            </Dropdown>
          </div>
        </div>

        {this.state.company === "new" && (
          <CompanyDetails header="New Company" />
        )}
      </div>
    );
  }
}

export default CompanyPosition;
