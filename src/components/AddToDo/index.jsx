import React from 'react';
import './style.css';
import plusIcon from '../../assets/svgs/plus-lg.svg';
import closeIcon from '../../assets/svgs/close.svg';
import { addToDo, filterAllToDos } from '../../actions/toDoActions';
import { connect } from 'react-redux';

const AddToDo = (props) => {
  const Open = () => {
    document.querySelector('#newToDo').classList.remove('hidden');
  }
  const Close = () => {
    const toDo = document.querySelector('#newToDo');
    toDo.classList.add('hidden');
    toDo.value = "";
  }
  const handleKeyDown = (ev) => {
    const toDo = document.querySelector('#newToDo');
    if (ev.keyCode === 27) {
      Close();
    } else if (ev.keyCode === 13 && toDo.value.length > 0) {
      props.addToDo(toDo.value);
      props.filterAllToDos();
      Close();
    }
  }
  return (
    <div id="newToDoBox">
      <button id="newToDoButton" onClick={Open}>
        <img src={plusIcon} alt="plus-icon" />
        Add a new ToDo
      </button>
      <button id="closeButton" onClick={Close}>
        <img src={closeIcon} alt="plus-icon" />
      </button>
      <textarea
        id="newToDo"
        type="text"
        placeholder="Add a new ToDo"
        onKeyDown={handleKeyDown}
        className="hidden"
      />
    </div>
  )
}

const mapStateToProps = (reducers) => (reducers.toDosProps)

const mapDispatchToProps = {
  addToDo,
  filterAllToDos
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo);