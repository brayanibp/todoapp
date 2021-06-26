import { connect } from 'react-redux';
import './style.css';

const ToDoFilter = (props) => {
  return (
    <>
      All
      Completed
      Uncompleted
      ToDoFilter
    </>
  );
}

const mapStateToProps = (reducers) => (reducers.toDoProps);

export default connect(mapStateToProps)(ToDoFilter);