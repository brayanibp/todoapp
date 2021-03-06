import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import * as toDoActions from '../../actions/toDoActions';
import { useEffect } from 'react';

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

  //DATEPICKED DATA CHANGED
  const handleDatePick = () => {
    const datepicker = document.querySelector(`#toDoDate_${props.id}`);
    if (!datepicker.value) return;
    const datepickerDate = new Date(String(datepicker.value).replace('-', '/')).getTime();
    const currentDate = new Date();
    // TAKING completed prop from store because actual props for the ToDo component comes from iteration in ToDoList component
    const completed = Boolean(props.list.find(toDo => parseInt(toDo.id) === parseInt(props.id)).completed);
    if (datepickerDate < currentDate && completed) {
      datepicker.classList.remove('ontime');
      datepicker.classList.add('expired');
    } else {
      datepicker.classList.remove('expired');
      datepicker.classList.add('ontime');
    }
    updateToDo();
  }

  //CHECK BUTTON PRESSED
  const handleCheck = () => {
    const checkbox = document.querySelector(`#toDoCheck_${props.id}`);
    const target = document.querySelector(`#toDoCheckButton_${props.id}`);
    checkbox.checked = !checkbox.checked;
    target.classList.toggle("checked");
    if (Boolean(props.expire_at)) {
      handleDatePick();
    }
    updateToDo();
  }

  useEffect(() => {
    const handleDateLoad = () => {
      // DATE LOAD
      const datepicker = document.querySelector(`#toDoDate_${props.id}`);
      if (!datepicker.value) return;
      const datepickerDate = new Date(String(datepicker.value).replace('-', '/')).getTime();
      const currentDate = new Date();
      datepickerDate < currentDate && !Boolean(props.completed) ? datepicker.classList.add('expired') : datepicker.classList.add('ontime');
    }
    handleDateLoad();
    loadAreaSize();
  }, [props.id, props.completed]);
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
        defaultValue={String(props.expire_at).replace('00:00:00', '').trim()}
        onChange={handleDatePick}
      />
      <input
        type="checkbox"
        hidden
        id={`toDoCheck_${props.id}`}
        defaultChecked={Boolean(props.completed)}
      />
      <button
        id={`toDoCheckButton_${props.id}`}
        className={Boolean(props.completed) ? "toDo__completed checked" : "toDo__completed"}
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