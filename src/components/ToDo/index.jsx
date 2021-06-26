import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import * as toDoActions from '../../actions/toDoActions';

const ToDo = (props) => {
  //UPDATE TO DO
  const updateToDo = () => {
    const toDoName = document.querySelector(`#toDo_${props.id}`);
    const toDoCheck = document.querySelector(`#toDoCheck_${props.id}`);
    const toDoExpire = document.querySelector(`#toDoDate_${props.id}`);
    const toDo = {
      id: props.id,
      name: toDoName.value,
      completed: toDoCheck.checked,
      expire_at: toDoExpire.value
    }
    props.updateToDo(toDo);
  }

  //ACTIVE AND DISABLE TEXTAREA FIELD
  const OpenAndClose = () => {
    const toDo = document.querySelector(`#toDo_${props.id}`);
    toDo.disabled = !toDo.disabled;
  }

  //DETECTING IF ESC KEY OR ENTER KEY WAS PRESSED
  const handleKeyPress = (ev) => {
    const toDoName = document.querySelector(`#toDo_${props.id}`);
    if (ev.keyCode === 27) {
      toDoName.value = props.name;
      loadAreaSize();
      OpenAndClose();
    } else if (ev.keyCode === 13) {
      OpenAndClose();
      updateToDo();
    }
  }

  //RESIZING TEXTAREA FIELDS ON LOAD
  const loadAreaSize = () => {
    const textarea_nodelist = document.querySelectorAll('textarea');
    const textareas = Array.prototype.slice.call(textarea_nodelist);
    textareas.forEach(textarea => {
      textarea.style.height = "5px";
      textarea.style.height = (textarea.scrollHeight) + "px";
    });
  }

  //RESIZING TEXTAREA FIELD ON TYPING
  const handleHeightResize = (ev) => {
    const el = ev.target;
    el.style.height = "5px";
    el.style.height = (el.scrollHeight) + "px";
  }

  //EDIT BUTTON PRESSED
  const HandleEdit = () => {
    OpenAndClose();
  }

  //DELETE BUTTON PRESSED
  const deleteToDo = () => {
    props.deleteToDo(props.id);
    props.filterAllToDos();
  }

  //CHECK BUTTON PRESSED
  const handleCheck = (ev) => {
    const checkbox = document.querySelector(`#toDoCheck_${props.id}`);
    const target = document.querySelector(`#toDoCheckButton_${props.id}`);
    checkbox.checked = !checkbox.checked;
    target.classList.toggle("checked");
    updateToDo();
  }

  //DATEPICKED DATA CHANGED
  const handleDatePick = (ev) => {
    const datepicker = ev.target;
    const datepickerDate = new Date(String(ev.target.value).replace('-', '/')).getTime()
    const currentDate = new Date();
    if (datepickerDate < currentDate) {
      datepicker.classList.remove('ontime');
      datepicker.classList.add('expired');
    } else {
      datepicker.classList.remove('expired');
      datepicker.classList.add('ontime');
    }
    updateToDo();
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
        type="date"
        id={`toDoDate_${props.id}`}
        className="toDo__date"
        defaultValue={props.expire_at}
        onChange={handleDatePick}
      />
      <input
        type="checkbox"
        hidden
        id={`toDoCheck_${props.id}`}
        defaultChecked={props.completed}
      />
      <button
        id={`toDoCheckButton_${props.id}`}
        className={props.completed ? "toDo__completed checked" : "toDo__completed"}
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