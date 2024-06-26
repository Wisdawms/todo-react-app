export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li id={id}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={(e) => deleteTodo(id, e)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
}
