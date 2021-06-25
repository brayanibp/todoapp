import React from 'react';
import './style.css';
import { connect } from 'react-redux';

const ToDo = (props) => {
  const Close = () => {
    document.querySelector(`#toDo_${props.id}`).disabled = true;
  }
  const handleKeyPress = (ev) => {
    const toDo = document.querySelector(`#toDo_${props.id}`);
    if (ev.keyCode === 27) {
      Close();
      toDo.value = props.name;
    } else if (ev.keyCode === 13) {
      toDo.value = "Nuevo";
      Close();
      console.log("COMMIT");
    }
  }
  const Open = () => {
    document.querySelector(`#toDo_${props.id}`).disabled = false;
  }
  const deleteTodo = () => {

  }
  const handleCheck = (ev) => {
    const checkbox = document.querySelector(`#toDoCheck_${props.id}`);
    const target = checkbox.parentElement.children[2];
    checkbox.checked = !checkbox.checked;
    target.classList.toggle("checked");
  }
  return (
    <div id={props.id} className="toDoCard" onKeyDown={handleKeyPress}>
      <input id={`toDo_${props.id}`} type="text" defaultValue={props.name} disabled />
      <input id={`toDoCheck_${props.id}`} type="checkbox" hidden={true} defaultChecked={props.completed} />
      <button className="toDo__completed" onClick={handleCheck}>
        Completed
      </button>
      <button className="toDo__edit" onClick={Open}>
        Edit
      </button>
      <button className="toDo__delete" onClick={deleteTodo}>
        Delete
      </button>
    </div>
  )
}

const mapStateToProps = (reducers) => (reducers.toDosProps);

export default connect(mapStateToProps)(ToDo);