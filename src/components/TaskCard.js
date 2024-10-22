import React from 'react';
import './TaskCard.css';

function TaskCard({ task, users }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 1:
        return 'icons/Img_LP.svg';
      case 2:
        return 'icons/Img_MP.svg';
      case 3:
        return 'icons/Img_HP.svg';
      case 4:
        return 'icons/SVG_Urgent_Priority_grey.svg';
      default:
        return '/icons/No_priority.svg';
    }
  };

  const assignedUser = users.find(user => user.id === task.userId);

  return (
    <div className="task-card">
      <div className="task-header">
        <div>
          <div className="task-id"><strong>{`${task.id}`}</strong></div> 
          <h4 className="task-title">{task.title}</h4>
        </div>
        {assignedUser && (
          <div className="avatar-container">
            <img 
              className="avatar" 
              src={assignedUser.avatar || 'icons/quickIscool.jpeg'} 
              alt={assignedUser.name || 'Brand Logo'} 
            />
          </div>
        )}
      </div>
      <div className="task-meta">
        <div className="priority-icon">
          <img src={getPriorityIcon(task.priority)} alt="priority" />
        </div>
        <div className="task-type">
          <span className="grey-dot"></span>
          {task.tag?.[0] || 'Feature Request'}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;


