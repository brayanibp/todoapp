import { connect } from 'react-redux';
import './style.css';
import * as toDosActions from '../../actions/toDoActions';

const ToDoFilter = (props) => {
  const filterByName = (ev) => {
    const arg = ev.target.value;
    props.filterToDoName(arg);
  }
  return (
    <>
      <div id="toDoSearch">
        <input type="text" onChange={filterByName} />
      </div>
      <div id="filterOptions">
        <button onClick={() => props.filterAllToDos()}>All</button>
        <button onClick={() => props.filterCompletedToDos()}>Completed</button>
        <button onClick={() => props.filterUncompletedToDos()}>Uncompleted</button>
      </div>
    </>
  );
}

const mapStateToProps = (reducers) => (reducers.toDosProps)
const mapDispatchToProps = {
  ...toDosActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);