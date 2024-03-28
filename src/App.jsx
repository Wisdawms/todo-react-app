import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  // getting todo items from local storage
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("TodoItems");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  // saving into local storage
  useEffect(() => {
    localStorage.setItem("TodoItems", JSON.stringify(todos));
  }, [todos]);

  // add todo item on submit
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: title,
          completed: false,
        },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id, e) {
    let item = e.target ? e.target.parentNode : null;
    if (item == null) {
      // for delete all, e here is each li element in dom
      item = e;
    }
    item.classList.add("slide-left");
    item.addEventListener("animationend", () => {
      setTodos((currentTodos) => {
        return currentTodos.filter((todo) => todo.id !== id);
      });
    });
  }

  return (
    <>
      <NewTodoForm
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        onSubmit={addTodo}
      />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
