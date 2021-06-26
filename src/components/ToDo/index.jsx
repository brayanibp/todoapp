import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import * as toDoActions from '../../actions/toDoActions';

const ToDo = (props) => {
  const OpenAndClose = () => {
    const toDo = document.querySelector(`#toDo_${props.id}`);
    toDo.disabled = !toDo.disabled;
  }
  const handleKeyPress = (ev) => {
    const toDoName = document.querySelector(`#toDo_${props.id}`);
    if (ev.keyCode === 27) {
      toDoName.value = props.name;
      loadAreaSize();
      OpenAndClose();
    } else if (ev.keyCode === 13) {
      OpenAndClose();
      const toDo = {
        id: props.id,
        name: toDoName.value,
        completed: document.querySelector(`#toDoCheck_${props.id}`).checked,
        expire_at: null
      }
      props.updateToDo(toDo);
    }
  }

  const loadAreaSize = () => {
    const textarea_nodelist = document.querySelectorAll('textarea');
    const textareas = Array.prototype.slice.call(textarea_nodelist);
    textareas.forEach(textarea => {
      textarea.style.height = "5px";
      textarea.style.height = (textarea.scrollHeight) + "px";
    });
  }

  const handleHeightResize = (ev) => {
    const el = ev.target;
    el.style.height = "5px";
    el.style.height = (el.scrollHeight) + "px";
  }

  const HandleEdit = () => {
    OpenAndClose();
  }
  const deleteToDo = () => {
    props.deleteToDo(props.id);
  }
  const handleCheck = (ev) => {
    const checkbox = document.querySelector(`#toDoCheck_${props.id}`);
    const target = document.querySelector(`#toDoCheckButton_${props.id}`);
    checkbox.checked = !checkbox.checked;
    target.classList.toggle("checked");
  }
  const handleDatePick = (ev) => {
    console.log(ev);
  }
  return (
    <div
      id={props.id}
      className="toDoCard"
      onKeyDown={handleKeyPress}
    >
      <textarea
        type="text"
        id={`toDo_${props.id}`}
        defaultValue={props.name}
        onChange={handleHeightResize}
        disabled
      />
      <input
        type="checkbox"
        hidden
        id={`toDoCheck_${props.id}`}
        defaultChecked={props.completed}
      />
      <input
        type="date"
        className="toDo__date"
        defaultValue={props.expire_at}
        onChange={handleDatePick}
      />
      <button
        id={`toDoCheckButton_${props.id}`}
        className="toDo__completed"
        onClick={handleCheck}
      ></button>
      <button
        className="toDo__edit"
        onClick={HandleEdit}
      ></button>
      <button
        className="toDo__delete"
        onClick={deleteToDo}
      ></button>
    </div>
  )
}

const mapStateToProps = (reducers) => (reducers.toDosProps);

const mapDispatchToProps = {
  ...toDoActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);