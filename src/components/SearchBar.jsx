import React from "react";

export default function SearchBar({ searchPhrase, handleChange }) {
  return (
    <div>
      <label>
        <input
          type="text"
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
