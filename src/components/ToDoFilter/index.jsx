import { connect } from 'react-redux';
import './style.css';
import * as toDosActions from '../../actions/toDoActions';

const ToDoFilter = (props) => {
  const filterByName = (ev) => {
    const arg = ev.target.value;
    props.filterAllToDos("name", arg);
    if (props.filteredList.length < 1) {
      props.fetchToDo(props.activeFilter, props.lastFilter, props.nextPage, props.list)
      props.filterAllToDos("name", arg);
    }
  }
  return (
    <>
      <div id="filtersBox">
        <div id="toDoSearch">
          <input type="text" onChange={filterByName} placeholder="Search Something..." />
        </div>
        <div id="filterOptions">
          <button onClick={() => props.filterAllToDos("all")}>All</button>
          <button onClick={() => props.filterAllToDos("completed")}>Completed</button>
          <button onClick={() => props.filterAllToDos("uncompleted")}>Uncompleted</button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (reducers) => (reducers.toDosProps)
const mapDispatchToProps = {
  ...toDosActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);