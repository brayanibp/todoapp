import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDo from '../ToDo';
import './style.css';
import { fetchToDo, filterAllToDos } from '../../actions/toDoActions';
import Loader from '../Loader';

const ToDoList = (props) => {
  const { list, nextPage, fetchToDo } = props;
  useEffect(() => {
    if (list.length < 1) {
      fetchToDo(nextPage);
    }
  }, [list, fetchToDo, nextPage]);
  return (
    <>
      <div id="toDoList">
        <h2>To Do List</h2>
        {
          !props.loading ?
            <>
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
                  })
                }
              </ul>
            </>
            :
            <Loader />
        }
      </div>
    </>
  );
}

const mapStateToProps = (reducers) => (reducers.toDosProps)

const mapDispatchToProps = {
  fetchToDo,
  filterAllToDos
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);