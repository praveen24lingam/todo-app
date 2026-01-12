import React, { useState } from "react";

export default function TodoForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task cannot be empty");
      return;
    }
    addTask(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
