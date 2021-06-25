import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDo from '../ToDo';
import './style.css';
import { fetchToDo } from '../../actions/toDoActions';

const ToDoList = (props) => {

  useEffect(() => {
    props.fetchToDo();
    console.log(props.list);
  });
  return (
    <div id="toDoList">
      <ul>
        {
          !props.loading && props.list.map(toDo => {
            return (
              <li key={toDo.id}>
                <ToDo
                  id={toDo.id}
                  name={toDo.name}
                  expire_at={toDo.expire_at}
                  completed={toDo.completed}
                />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (reducers) => (reducers.toDosProps)

const mapDispatchToProps = {
  fetchToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);