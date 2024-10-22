import React, { useState } from 'react';
import './Dropdown.css'; 

function Dropdown({ onGroupingChange, onOrderingChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={toggleDropdown}>
        <img src="icons/Display.svg" alt="Display Icon"/> Display
        <img src="icons/down.svg" alt="down button" />
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-group">
            <span>Grouping</span>
            <select onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="dropdown-group">
            <span>Ordering</span>
            <select onChange={(e) => onOrderingChange(e.target.value)}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
