import React from 'react';

export default function TodoItem({ task, toggleComplete, deleteTask, editTask }) {
  if (!task) return null;

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="left">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task._id)}
        />

        {/* Title + Date */}
        <div className="task-info">
          <span
            className="task-title"
            onDoubleClick={() => {
              const newTitle = prompt('Edit task', task.title);
              if (newTitle && newTitle.trim()) editTask(task._id, newTitle.trim());
            }}
          >
            {task.title}
          </span>
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <button className="delete-btn" onClick={() => deleteTask(task._id)}>✖</button>
    </div>
  );
}
