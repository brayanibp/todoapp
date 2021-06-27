import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDo from '../ToDo';
import './style.css';
import { fetchToDo } from '../../actions/toDoActions';
import Loader from '../Loader';
import NothingFound from '../NothingFound';

const ToDoList = (props) => {
  const { list, nextPage, fetchToDo, activeFilter, lastFilter, filteredList } = props;
  useEffect(() => {
    if (list.length < 1) {
      fetchToDo(activeFilter, lastFilter, nextPage);
    } else if (filteredList.length < 1 && nextPage !== null) {
      fetchToDo(activeFilter, lastFilter, nextPage);
    }
  }, [list, fetchToDo, nextPage, activeFilter, lastFilter, filteredList]);
  return (
    <>
      <div id="toDoList">
        <h2>To Do List: {activeFilter}</h2>
        {
          !props.loading ?
            <>
              <ul>
                {
                  filteredList.length > 0 ? filteredList.map(toDo => {
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
                    :
                    <NothingFound />
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
  fetchToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);