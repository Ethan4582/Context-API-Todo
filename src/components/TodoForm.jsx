import React, { useState } from "react";
import { UseTodoContext } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = UseTodoContext();

  // Adds a new todo
  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return; // Prevent empty or whitespace-only todos
    addTodo({ todo: todo.trim(), completed: false }); // Add trimmed todo
    setTodo(""); // Reset input field
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
