import React from "react";
import CompanyDetails from "./CompanyDetails";

class CompanyPosition extends React.Component {
  state = {
    companyValue: ""
  };

  handleCompanySelect = event => {
    this.setState({ companyValue: event.target.value });
  };

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
            <select
              className="ui dropdown"
              onChange={this.handleCompanySelect}
              value={this.state.companyValue}
            >
              <option value="" disabled>
                Select a Company
              </option>
              <option value="new">Add New Company</option>
              <option value="none">I'm not sure</option>
              {/* TODO: Get list of companies */}
            </select>
          </div>
        </div>
        {this.state.companyValue === "new" && (
          <CompanyDetails header="New Company" />
        )}
      </div>
    );
  }
}

export default CompanyPosition;
