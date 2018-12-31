import React from "react";
import cities from "../../api/cities";
import "./LocationSearchInput.css";

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

  handleSuggestionClick(address) {
    this.setState({
      address: address,
      suggestions: []
    });
  }

  buildSuggestionList() {
    return this.state.suggestions.map((suggestion, index) => {
      const name = suggestion.matching_full_name;
      return (
        <div
          className="floating item suggestion"
          key={index}
          onClick={() => this.handleSuggestionClick(name)}
        >
          {name}
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          value={this.state.address}
          onChange={this.handleChange}
          placeholder="Type a location..."
        />
        {this.state.suggestions.length > 0 && (
          <div className="ui segment suggestion-list">
            {this.buildSuggestionList()}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default LocationSearchInput;
