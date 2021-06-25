import { ADD_TODO } from "../types/toDoTypes"

export const addToDo = (toDoName) => async (dispatch) => {
  const newToDo = {
    id: 1,
    name: toDoName,
    expire_at: null,
    completed: false
  };
  dispatch({ type: ADD_TODO, payload: newToDo });
}

export const updateTodo = () => () => {

}

export const selectToDo = () => () => {

}

export const deleteToDo = () => () => {

}

export const fetchToDo = () => () => {

}

const toDoActions = {
  addToDo,
  updateTodo,
  selectToDo,
  deleteToDo,
  fetchToDo,
}

export default toDoActions;