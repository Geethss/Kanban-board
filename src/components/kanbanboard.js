import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import Dropdown from './Dropdown';
import './KanbanBoard.css';

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});
  const [grouping, setGrouping] = useState('status');

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        const ticketsArray = response.data.tickets || [];
        const usersArray = response.data.users || [];
        setTasks(ticketsArray);
        setUsers(usersArray);
        groupTasks(ticketsArray, grouping, usersArray);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [grouping]);

  const groupTasks = (tasks = [], type, users) => {
    const grouped = tasks.reduce((acc, task) => {
      const key = type === 'user'
        ? users.find(user => user.id === task.userId)?.name || 'Unknown User'
        : type === 'priority'
        ? task.priority
        : task.status;
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
    setGroupedTasks(grouped);
  };

  const getPriorityLabel = (priority) => {
    const priorityLabels = {
      0: 'No Priority',
      1: 'Urgent Priority',
      2: 'Medium Priority',
      3: 'High Priority',
      4: 'Low Priority'
    };
    return priorityLabels[priority] || 'Unknown Priority';
  };

  const getPriorityIcon = (priority) => {
    const priorityIcons = {
      0: '/icons/No_priority.svg',
      1: '/icons/SVG_orange_Urgent_Priority_colour.svg',
      2: '/icons/Img_MP.svg',
      3: '/icons/Img_HP.svg',
      4: '/icons/Img_LP.svg'
    };
    return priorityIcons[priority] || '/icons/No_priority.svg';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <img src="icons/To_do.svg" alt="Todo Icon" />;
      case 'In progress':
        return <img src="icons/in_progress.svg" alt="In Progress Icon" />;
      case 'Done':
        return <img src="icons/Done.svg" alt="Done Icon" />;
      case 'Backlog':
        return <img src="icons/Backlog.svg" alt="Backlog Icon" />;
      case 'Canceled':
        return <img src="icons/Cancelled.svg" alt="Canceled Icon" />;
      default:
        return null;
    }
  };

  const handleGroupingChange = (groupingType) => {
    setGrouping(groupingType);
    groupTasks(tasks, groupingType, users);
  };

  const handleOrderingChange = (order) => {
    const orderedTasks = { ...groupedTasks };
    Object.keys(orderedTasks).forEach(group => {
      orderedTasks[group] = orderedTasks[group].sort((a, b) => {
        if (order === 'ascending') return a.id - b.id;
        else return b.id - a.id;
      });
    });
    setGroupedTasks(orderedTasks);
  };

  return (
    <div>
      <Dropdown onGroupingChange={handleGroupingChange} onOrderingChange={handleOrderingChange} />

      <div className="kanban-board">
        {grouping === 'status' && ['Todo', 'In progress', 'Done', 'Backlog', 'Canceled'].map(status => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <h3>
              {getStatusIcon(status)} {status} {groupedTasks[status]?.length}
              </h3>
              <div className="column-controls">
                <img src="/icons/add.svg" alt="add icon" />
                <img src="/icons/3%20dot%20menu.svg" alt="menu icon" />
              </div>
            </div>
            {groupedTasks[status]?.map(task => (
              <TaskCard key={task.id} task={task} users={users} />
            ))}
          </div>
        ))}

        {grouping === 'user' && Object.keys(groupedTasks).map(user => (
          <div key={user} className="kanban-column">
            <div className="column-header">
              <h3>{user} ({groupedTasks[user]?.length || 0})</h3>
              <div className="column-controls">
                <img src="/icons/add.svg" alt="add icon" />
                <img src="/icons/3%20dot%20menu.svg" alt="menu icon" />
              </div>
            </div>
            {groupedTasks[user]?.map(task => (
              <TaskCard key={task.id} task={task} users={users} />
            ))}
          </div>
        ))}

        {grouping === 'priority' && Object.keys(groupedTasks).map(priority => (
          <div key={priority} className="kanban-column">
            <div className="column-header">
              <h3>
                <img src={getPriorityIcon(priority)} alt={`Priority ${priority}`} />
                {getPriorityLabel(priority)} ({groupedTasks[priority]?.length || 0})
              </h3>
              <div className="column-controls">
                <img src="/icons/add.svg" alt="add icon" />
                <img src="/icons/3%20dot%20menu.svg" alt="menu icon" />
              </div>
            </div>
            {groupedTasks[priority]?.map(task => (
              <TaskCard key={task.id} task={task} users={users} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;


