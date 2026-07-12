import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (!task.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: task } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTask("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    if (editId === id) {
      setEditId(null);
      setTask("");
    }
  };

  const editTodo = (todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-5">
      <div className="bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl border border-gray-700 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">
            TODO LIST
          </h1>

          <div className="flex items-center gap-2 bg-purple-400 hover:bg-purple-500 px-4 py-2 rounded-full shadow-lg transition duration-300">
            <span className="text-2xl">📅</span>
            <span className="text-white font-bold text-lg">
              {todos.length}
            </span>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            className="flex-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={addTodo}
            className="bg-green-600 hover:bg-green-700 text-black px-5 py-2 rounded-lg font-semibold transition duration-300"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-400">
            No tasks added yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-800 rounded-lg p-3"
              >
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-1 cursor-pointer ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {todo.text}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editTodo(todo)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold transition duration-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-600 hover:bg-red-700 text-black px-3 py-1 rounded-lg font-semibold transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;