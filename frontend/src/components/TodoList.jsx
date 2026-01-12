

import React from 'react';
import TodoItem from './TodoItem.jsx';

export default function TodoList({ tasks, toggleComplete, deleteTask, editTask }) {
  if (!tasks || tasks.length === 0) return <p className="no-tasks">No tasks found</p>;

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}
