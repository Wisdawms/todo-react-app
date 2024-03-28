import { useState, useEffect } from "react";
const placeholderMsg = "Type in a new to-do item to add";

export function NewTodoForm({ onSubmit, deleteTodo, todos }) {
  // const [newItem, setNewItem] = useState("")
  const [newItem, setNewItem] = useState(() => {
    const localValue = localStorage.getItem("BOX");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    let inputBox = null;
    if (inputBox == null) {
      inputBox = document.querySelector("#item");
    }
    if (inputBox.placeholder !== placeholderMsg) {
      inputBox.placeholder = placeholderMsg;
    }
    localStorage.setItem("BOX", JSON.stringify(newItem));
  }, [newItem]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem == "" || todos.some((dict) => dict.title == newItem)) {
      let inputBox = document.querySelector("#item");
      inputBox.classList.toggle("shake");
      inputBox.addEventListener("animationend", () => {
        inputBox.classList.remove("shake");
      });
      return;
    }

    onSubmit(newItem);

    setNewItem(""); // empty new item box on submit
  }

  function deleteAllTodos() {
    let inputBox = null;
    if (inputBox == null) {
      inputBox = document.querySelector("#item");
    }
    if (todos.length !== 0) {
      todos.some((dict) => {
        const item = document.querySelector(`li[id='${dict.id}']`);
        deleteTodo(dict.id, item);
      });
      inputBox.placeholder = "Deleted all items!";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="">Add a new To-do item: </label>
        <input
          placeholder="Type in a new to-do item to add"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button type="submit" className="btn">
        Add
      </button>
      <button type="button" onClick={deleteAllTodos} className="btn btn-danger">
        Delete All
      </button>
    </form>
  );
}
