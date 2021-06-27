import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDo from '../ToDo';
import './style.css';
import { fetchToDo, filterAllToDos } from '../../actions/toDoActions';
import Loader from '../Loader';

const ToDoList = (props) => {
  useEffect(() => {
    if (!props.list.length) {
      props.fetchToDo(props.nextPage);
      props.filterAllToDos();
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
  fetchToDo,
  filterAllToDos
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);