import React from "react";

import "./searchBar.css";

export default function SearchBar({ searchPhrase, handleChange }) {
  return (
    <div className="searchBarContainer">
      <label>
        <input
          className="searchBar"
          type="text"
          placeholder="Search character..."
          value={searchPhrase}
          onChange={(event) => {
            event.preventDefault();
            handleChange(event.target.value);
          }}
        />
      </label>
    </div>
  );
}
