import React, { useState, useEffect } from "react";
import { TodoProvider, UseTodoContext } from "./contexts";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, settodos] = useState([]);

  const addTodo = (todo) => {
    settodos((prev) => [
      {
        id: Date.now(),
        ...todo,
      },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    settodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id !== id));
  };
const togleComplete = (id) => {
  settodos((prev) =>
    prev.map((prevTodo) =>
      prevTodo.id === id
        ? { ...prevTodo, completed: !prevTodo.completed } // Fix: Toggle `completed`
        : prevTodo
    )
  );
};


  useEffect(() => {
    try {
      const todos = localStorage.getItem("todos");
      if (todos) {
        const parsedTodos = JSON.parse(todos);
        if (Array.isArray(parsedTodos)) {
          settodos(parsedTodos);
        } else {
          console.warn(
            "Invalid todos format in localStorage. Resetting to an empty array."
          );
          settodos([]);
        }
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      settodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ addTodo, updateTodo, togleComplete, todos, deleteTodo }}
    >
      <div className="bg-[#6486ba] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
