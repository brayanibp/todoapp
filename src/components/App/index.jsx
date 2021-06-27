import React from 'react';
import './style.css';
import ToDoList from '../ToDoList';
import AddToDo from '../AddToDo';
import ToDoFilter from '../ToDoFilter';
import LoadMoreToDos from '../LoadMoreToDos';

const App = (props) => {
  return (
    <>
      <div className="header">
        <h1>This is my ToDo App</h1>
        <h2>Add a ToDo</h2>
      </div>
      <div id="AppContainer">
        <div>
          <ToDoFilter />
          <AddToDo />
          <LoadMoreToDos />
        </div>
        <div>
          <ToDoList />
        </div>
      </div>
    </>
  )
}

export default App;