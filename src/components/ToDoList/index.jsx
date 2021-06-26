import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDo from '../ToDo';
import './style.css';
import { fetchToDo } from '../../actions/toDoActions';
import Loader from '../Loader';

const ToDoList = (props) => {
  useEffect(() => {
    if (!props.list.length) {
      props.fetchToDo();
    }
  }, [props]);
  return (
    <div id="toDoList">
      {
        !props.loading ?
          <ul>
            {
              props.filteredList.map(toDo => {
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
              }).reverse()
            }
          </ul>
          :
          <Loader />
      }
    </div>
  );
}

const mapStateToProps = (reducers) => (reducers.toDosProps)

const mapDispatchToProps = {
  fetchToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);