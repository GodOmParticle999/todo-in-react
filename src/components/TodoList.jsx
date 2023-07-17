import { useEffect, useRef } from "react";

const TodoList = ({
    todos,
    setTodos,
    setInput,
    setToggleSubmit,
    setEditId,
    editId,
    completedTasks,
    setCompletedTasks
  }) => {
    const endOfList=useRef(null)
    const endOfCompletedList=useRef(null)
    const deleteHandler = ({ id }) => {
      setTodos(
        todos.filter((todo) => {
          return todo.id !== id;
        })
      )
      setInput("");
      setToggleSubmit(true)
    };
    const toggleHandler = ({ id }) => {
      setTodos(
        // todos.map((todo)=>{
        //   if(todo.id===id){
        //     return ({...todo,completed:!todo.completed})
        //   }
        //   return todo
        // })

        [...todos].map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      )
      setCompletedTasks([...todos].filter((todo)=>{
        return todo.completed===true
      }));
      setInput("");
    };
    const clearHandler = () => {
      setTodos([]);
      setInput("");
      setToggleSubmit(true)
      setCompletedTasks([])
    };
    const editHandler = ({ id }) => {
      let newEdititem = todos.find((todo) => {
        return todo.id === id;
      });
      
      setToggleSubmit(false);
      setInput(newEdititem.title);
      setEditId(id)
     
    };
    useEffect(() => {
      localStorage.setItem("completedLists", JSON.stringify(completedTasks));
    }, [completedTasks]);
    const zeroAdder=(obj)=>{
         return obj<10?"0"+obj:obj
    }
    useEffect(() => {
     endOfList.current?.scrollIntoView({behavior:'smooth'});
    
    }, [todos])
    useEffect(() => {
     endOfCompletedList.current?.scrollIntoView({behavior:'smooth'});
    
    }, [completedTasks])
    
    return (
      <>
        
        <div className="todoList">
          {todos.map((todo) => {
            return (
              <div className="todoListItem" key={todo.id}>
                <input title="Completed?"
                  className={editId?"checkbox disable":"checkbox"}
                  onChange={() => toggleHandler(todo)}
                  checked={todo.completed}
                  type="checkbox"
                />
                <p id="scroll" onClick={()=>{}}
                  title="Your Todo"
                  className={
                    todo.completed
                      ? "character completed"
                      : "character notCompleted"
                  }
                > 
                 <span className={todo.id===editId?"cssClass pspan ":"notCssClass pspan"}>{todo.title}</span>
                  <span className="pDiv">( {zeroAdder(todo.date)}:{zeroAdder(todo.month)}:{todo.year})</span>
                </p> 
                <div className="buttons">
                  <button onClick={() => editHandler(todo)} className={todo.completed?"edit opa":"edit"}>
                    <span className="button" title="Edit Todo?">
                      🖊
                    </span>
                  </button>
                  <button className={todo.completed?"delete opa":"delete " } onClick={() => deleteHandler(todo)}>
                    <span className="button" title="Delete Todo?">
                      ❌
                    </span>
                  </button>
                </div>
               
              </div>
            )
          })}
          <div ref={endOfList}/>
        </div>
        <div>
          {completedTasks.length>=1&&<h2 style={{color:"rgb(256, 200, 100)"}}>completed tasks<span style={{color:"rgb(251, 200,0)"}}> : {completedTasks.length}</span></h2>}
         <div className="completedContainer"> {completedTasks&&completedTasks.map((completed)=>{
        return(
              <p className="complete" key={completed.id}>{completed.title}</p>
        )
         } )}
         <div ref={endOfCompletedList}/>
      </div>
        
      
        </div>
  
        {todos.length > 0 && (
          <button className="clearAll" onClick={clearHandler}>
            Clear All
          </button>
        )}
      </>
    );
  };
  
  export default TodoList;
  