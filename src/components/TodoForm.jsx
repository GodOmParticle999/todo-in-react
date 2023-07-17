import React, { useEffect, useState } from "react";
import Bars from "./Bars";
const TodoForm = ({
  input,
  setInput,
  todos,
  setTodos,
  toggleSubmit,
  editId,
  setToggleSubmit,
  setEditId,
  completedTasks,
}) => {
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    setInput(e.target.value);
    setError(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!input) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (input && !toggleSubmit) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === editId) {
            return { ...todo, title: input };
          }
          return todo;
        })
      );
      setToggleSubmit(true);
      setInput("");
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: new Date().getTime(),
          title: input,
          completed: false,
          date: new Date().getDate(),
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
      ]);
      setInput("");
    }

    // setError(false)
  };
  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <form>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={changeHandler}
          placeholder="Your next todo....✍"
        />
        {toggleSubmit ? (
          <button onClick={submitHandler}>
            <span className="button" title="Add Todo?">
              ➕
            </span>
          </button>
        ) : (
          <button onClick={submitHandler}>
            <span className="button" title="Update Todo?">
              🖊
            </span>
          </button>
        )}
      </form>
      {error && (
        <div className="displayError">
          {toggleSubmit
            ? "Please enter the next todo!"
            : "Please update the selected todo!"}
        </div>
      )}
      {todos.length > 0 && (
        <h2 className="headerSpan">
          {todos.length === 1 ? "Task" : "Tasks"} to be completed :{" "}
          {todos.length - completedTasks.length}{" "}
        </h2>
      )}
      <div className={todos.length === 0 ? "horizontal" : "noBars"}>
        <Bars />
        <Bars />
        <Bars />
        <Bars />
        <Bars />
      </div>
    </>
  );
};

export default TodoForm;
