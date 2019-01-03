import React from "react";

class CompanyDetails extends React.Component {
  state = {
    categoryValue: ""
  };

  handleCategorySelect = event => {
    this.setState({ categoryValue: event.target.value });
  };

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">{this.props.header}</h3>
        <div className="three fields">
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
          <div className="field">
            <label>Category</label>
            <select
              onChange={this.handleCategorySelect}
              value={this.state.companyValue}
            >
              {/* TODO: make this multi-selectable */}
              <option value="">Category</option>
              <option value="distributor">Distributor</option>
              <option value="sale-agent">Sales Agent</option>
              <option value="prod-company">Production Company</option>
              {/* TODO: Get list of categories */}
            </select>
          </div>
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
