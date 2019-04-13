import React from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
  return (
    <input type="text"
      className="form-control search-input"
      placeholder="type to search" 
      onChange={(event) => {
        props.onChangeList(event.target.value)
      }}
    />
  );
};

export default SearchPanel;
