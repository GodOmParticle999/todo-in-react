import "./App.css";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { useState } from "react";
const getTodos = () => {
  const List = localStorage.getItem("todoLists");
  if (List) {
    return JSON.parse(List);
  } else {
    return [];
  }
};
const getCompletedTasks = () => {
  const completedList = localStorage.getItem("completedLists");
  if (completedList) {
    return JSON.parse(completedList);
  } else {
    return [];
  }
};
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(getTodos());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  // const [bars,setBars]=useState(true);
  const [completedTasks, setCompletedTasks] = useState(getCompletedTasks());
  const [editId, setEditId] = useState(null);
  return (
    <div className="parentContainer">
      <Header />
      <div className="wrapperContainer">
        <TodoForm
          completedTasks={completedTasks}
          editId={editId}
          setEditId={setEditId}
          setToggleSubmit={setToggleSubmit}
          toggleSubmit={toggleSubmit}
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
        />
        <TodoList
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          setEditId={setEditId}
          editId={editId}
          setToggleSubmit={setToggleSubmit}
          toggleSubmit={toggleSubmit}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
}

export default App;
