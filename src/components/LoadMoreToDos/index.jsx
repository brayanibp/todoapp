import { connect } from 'react-redux';
import { fetchToDo } from '../../actions/toDoActions';
const LoadMoreToDos = (props) => {
  return (
    <button id="fetchMoreToDos" onClick={() => props.fetchToDo(props.activeFilter, props.lastFilter, props.nextPage, props.list)}>Load More To Dos</button>
  )
}

const mapStateToProps = (reducers) => (reducers.toDosProps)

const mapDispatchToProps = {
  fetchToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreToDos);