import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { handleLocationSearch } from "../../actions";

class LocationSearchInput extends React.Component {
  buildSuggestionOptions(suggestions) {
    return suggestions.map(suggestion => {
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
    const {
      suggestions,
      input: { name, onChange }
    } = this.props;
    return (
      <Select
        name={name}
        onChange={onChange}
        onInputChange={this.handleInput}
        options={this.buildSuggestionOptions(suggestions ? suggestions : [])}
        placeholder="Type a location..."
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
