import React, {useState,useEffect} from "react";
import "./App.css";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  

  // store tasks in the local storage as a JSON
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
        setTodos(loadedTodos);
    }
  }, []);
    useEffect(() => {
        if(todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    }, [todos]);


  // handlesubmit 
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
    } else {
        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }
  

  // deleteToDo
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  

  // toggleComplete
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  

  // submitEdits
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

  
return(
    <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" id = 'todoAdd'/>
            <button type="submit" id='addBtn'>+</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              {/* Add checkbox for toggle complete */}
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {/* if it is edit mode, display input box, else display text */}
              {todo.id === todoEditing ?
                (<input
                  type="text"
                  id = {todo.id}
                  defaultValue={todo.text}
                />) :
                (<div>{todo.text}</div>)
              }
            </div>
            <div className="todo-actions">
              {/* if it is edit mode, allow submit edit, else allow edit */}
              {todo.id === todoEditing ?
              (
                <button onClick={() => submitEdits(todo)}>Submit Edits</button>
              ) :
              (
                <button onClick={() => setTodoEditing(todo.id)}><img src={require('./images/edit.png').default}/></button>
              )}
              <button onClick={() => deleteTodo(todo.id)}><img src={require('./images/delete.png').default}/></button>
            </div>
          </div>
        ))}
    </div>
);

};
export default App;
