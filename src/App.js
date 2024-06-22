import React, { useState, useEffect } from "react";
import "./App.css";
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import submitIcon from './images/submit.png';

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

  // handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    let todo = document.getElementById('todoAdd').value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo]);
    } else {
      alert("Enter a valid task");
    }
    document.getElementById('todoAdd').value = "";
  }

  // delete a todo
  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // toggle the completed status of a todo
  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // submit edits to a todo
  function submitEdits(newTodo) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id='todoAdd' />
        <button type="submit" id='addBtn'>+</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className={`todo ${todo.completed ? "completed" : ""}`}>
          <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.id !== todoEditing && (
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
            )}
            {todo.id === todoEditing ? (
              <input
                type="text"
                id={todo.id}
                defaultValue={todo.text}
                style={{ flexBasis: "70%" }}
              />
            ) : (
              <span>{todo.text}</span>
            )}
          </div>
          <div className="todo-actions">
            {todo.id !== todoEditing && !todo.completed && (
              <button onClick={() => setTodoEditing(todo.id)}><img src={editIcon} alt="Edit" /></button>
            )}
            {todo.id === todoEditing && (
              <button onClick={() => submitEdits(todo)} id="submitBtn"><img src={submitIcon} alt="Submit" /></button>
            )}
            <button onClick={() => deleteTodo(todo.id)}><img src={deleteIcon} alt="Delete" /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
