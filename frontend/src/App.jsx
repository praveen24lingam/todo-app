
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTasks(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const addTask = (title) => {
    axios.post('http://localhost:5000/api/todos', { title })
      .then(res => setTasks([res.data, ...tasks]))
      .catch(err => console.error('Add task error:', err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(err => console.error('Delete task error:', err));
  };

  const toggleComplete = (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !task.completed })
      .then(res => setTasks(tasks.map(t => t._id === id ? res.data : t)))
      .catch(err => console.error('Toggle complete error:', err));
  };

  const editTask = (id, title) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    axios.put(`http://localhost:5000/api/todos/${id}`, { title })
      .then(res => setTasks(tasks.map(t => t._id === id ? res.data : t)))
      .catch(err => console.error('Edit task error:', err));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>🌟 My Todo List</h1>
      <TodoForm addTask={addTask} />

      <div className="filter-buttons">
        {['All', 'Completed', 'Pending'].map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <TodoList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

