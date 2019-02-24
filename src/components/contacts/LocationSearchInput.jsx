import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { handleLocationSearch } from "../../actions";

class LocationSearchInput extends React.Component {
  buildSuggestionOptions() {
    return this.props.suggestions.map(suggestion => {
      const location = suggestion.matching_full_name;
      return {
        value: location,
        label: location
      };
    });
  }

  handleInput = value => {
    const { name } = this.props.input;
    this.props.handleLocationSearch(name, value);
  };

  render() {
    const { name, onChange } = this.props.input;
    return (
      <Select
        name={name}
        placeholder="Type a location..."
        onInputChange={this.handleInput}
        onChange={onChange}
        options={this.buildSuggestionOptions()}
      />
    );
  }
}

const mapStateToProps = (state, { input }) => {
  return {
    suggestions: state.location[input.name]
  };
};

export default connect(
  mapStateToProps,
  { handleLocationSearch }
)(LocationSearchInput);
