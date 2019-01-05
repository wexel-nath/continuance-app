import React from "react";
import cities from "../../api/cities";
import Dropdown from "../ui/Dropdown";

class LocationSearchInput extends React.Component {
  state = {
    address: "",
    suggestions: []
  };

  handleChange = async event => {
    const address = event.target.value;
    this.setState({ address: address });
    if (address === "") {
      this.setState({ suggestions: [] });
      return;
    }

    const response = await cities.get("", {
      params: { search: address }
    });
    this.setState({
      suggestions: response.data._embedded["city:search-results"]
    });
  };

  buildSuggestionList() {
    return this.state.suggestions.map((suggestion, index) => {
      return (
        <div key={index} className="item">
          {suggestion.matching_full_name}
        </div>
      );
    });
  }

  render() {
    return (
      <Dropdown
        className="ui search selection dropdown"
        placeholder="Type a location..."
        value={this.state.address}
        handleChange={this.handleChange}
      >
        {this.buildSuggestionList()}
      </Dropdown>
    );
  }
}

export default LocationSearchInput;
