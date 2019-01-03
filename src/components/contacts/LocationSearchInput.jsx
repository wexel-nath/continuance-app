import React from "react";
import cities from "../../api/cities";
import DropdownItem from "../ui/DropdownItem";
import DropdownList from "../ui/DropdownList";

class LocationSearchInput extends React.Component {
  state = {
    cursor: -1,
    address: "",
    focus: false,
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

  handleKeyDown = event => {
    let c = this.state.cursor;
    const max = this.state.suggestions.length - 1;
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSuggestionClick(this.state.suggestions[c].matching_full_name);
      return;
    }
    event.keyCode === 38 && (c = c <= 0 ? max : c - 1);
    event.keyCode === 40 && (c = c >= max ? 0 : c + 1);
    this.setState({ cursor: c });
  };

  handleSuggestionClick(address) {
    this.setState({
      address: address,
      suggestions: []
    });
  }

  handleSuggestionMouseEnter(index) {
    this.setState({
      cursor: index
    });
  }

  buildSuggestionList() {
    return this.state.suggestions.map((suggestion, index) => {
      const name = suggestion.matching_full_name;
      return (
        <DropdownItem
          key={index}
          value={name}
          selected={this.state.cursor === index}
          handleClick={() => this.handleSuggestionClick(name)}
          handleMouseEnter={() => this.setState({ cursor: index })}
        />
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
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          onKeyDown={this.handleKeyDown}
          placeholder="Type a location..."
        />
        <DropdownList
          active={this.state.focus && this.state.suggestions.length > 0}
        >
          {this.buildSuggestionList()}
        </DropdownList>
      </React.Fragment>
    );
  }
}

export default LocationSearchInput;
