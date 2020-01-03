import { useState, useEffect } from "react";

import { getCities } from "../../api/cities";

const buildOptions = locations => {
  return locations.map(location => {
    const name = location.matching_full_name;
    return {
      value: name,
      label: name
    };
  });
};

const useLocations = () => {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [delayFunc, setDelayFunc] = useState(null);

  const handleSearch = async () => {
    const { data } = await getCities(search);
    if (data) {
      setLocations(data._embedded["city:search-results"]);
    }
  };

  useEffect(() => {
    if (search !== "") {
      clearTimeout(delayFunc);
      setDelayFunc(setTimeout(handleSearch, 300));
    }
  }, [search]);

  return [buildOptions(locations || []), setSearch];
};

export default useLocations;
