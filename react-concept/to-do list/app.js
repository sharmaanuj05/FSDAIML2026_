const { useState, useEffect } = React;

const DEFAULT_TASKS = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: false }
];

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("react_todos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TASKS;
  });

  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem("react_todos", JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInputText("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) {
      handleDeleteTask(id);
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: trimmed } : task
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleResetDefaults = () => {
    setTasks(DEFAULT_TASKS);
    setEditingId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <form className="input-section" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn-add">Add Task</button>
      </form>

      <div className="stats-bar">
        <span>Total: {totalCount}</span>
        <span>Pending: {pendingCount}</span>
        <span>Completed: {completedCount}</span>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-message">
          <p>No tasks found.</p>
          {tasks.length === 0 && (
            <button onClick={handleResetDefaults} className="filter-btn">
              Reset Default Tasks
            </button>
          )}
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit(task.id);
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                  />
                  <div className="task-actions">
                    <button
                      className="btn-save"
                      onClick={() => handleSaveEdit(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    <span className={`task-text ${task.completed ? "completed" : ""}`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleStartEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {completedCount > 0 && (
        <div className="footer">
          <button className="btn-clear" onClick={handleClearCompleted}>
            Clear Completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TodoApp />);
