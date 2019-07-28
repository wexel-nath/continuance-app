import React, { useState, useEffect } from "react";
import Select from "react-select";

import { getCities } from "../../api/cities";

const buildSuggestionOptions = suggestions => {
  return suggestions.map(suggestion => {
    const location = suggestion.matching_full_name;
    return {
      value: location,
      label: location
    };
  });
};

const useSuggestions = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [delayFunc, setDelayFunc] = useState(null);

  const handleSearch = async () => {
    const { data } = await getCities(search);
    if (data) {
      setSuggestions(data._embedded["city:search-results"]);
    }
  };

  useEffect(() => {
    if (search !== "") {
      clearTimeout(delayFunc);
      setDelayFunc(setTimeout(handleSearch, 300));
    }
  }, [search]);

  return [suggestions, setSearch];
};

const LocationSearchInput = ({ input }) => {
  const [suggestions, setSearch] = useSuggestions();

  const { name, onChange } = input;
  return (
    <Select
      name={name}
      onChange={onChange}
      onInputChange={v => {
        setSearch(v);
      }}
      options={buildSuggestionOptions(suggestions || [])}
      placeholder="Type a location..."
    />
  );
};

export default LocationSearchInput;
