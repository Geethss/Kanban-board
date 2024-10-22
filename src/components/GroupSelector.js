import React from 'react';

function GroupSelector({ onGroupingChange }) {
  const handleSelectChange = (event) => {
    onGroupingChange(event.target.value);
  };

  return (
    <div className="group-selector">
      <label>Group By: </label>
      <select onChange={handleSelectChange}>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupSelector;
