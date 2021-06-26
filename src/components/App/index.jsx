import React from 'react';
import './style.css';
import ToDoList from '../ToDoList';
import AddToDo from '../AddToDo';

const App = (props) => {
  return (
    <>
      <div className="header">
        <h1>This is my ToDo App</h1>
        <h2>Add a ToDo</h2>
      </div>
      <AddToDo />
      <ToDoList />
    </>
  )
}

export default App;