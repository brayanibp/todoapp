import axios from 'axios';
import { ADD_TODO, DELETE_TODO, FETCH_TODOS, FILTER_ALL_TODOS, FILTER_COMPLETED_TODOS, FILTER_TODO_NAME, FILTER_UNCOMPLETED_TODOS, TODOS_LOADING, UPDATE_TODO } from "../types/toDoTypes"

export const addToDo = (toDoName) => async (dispatch) => {
  const newToDo = {
    id: 4,
    name: toDoName,
    expire_at: null,
    completed: false
  };
  dispatch({ type: ADD_TODO, payload: newToDo });
}

export const updateToDo = (toDo) => (dispatch) => {
  dispatch({ type: UPDATE_TODO, payload: toDo });
}

export const deleteToDo = (id) => (dispatch) => {
  dispatch({ type: DELETE_TODO, payload: id });
}

export const filterAllToDos = () => (dispatch) => {
  dispatch({ type: FILTER_ALL_TODOS });
}

export const filterCompletedToDos = () => (dispatch) => {
  dispatch({ type: FILTER_COMPLETED_TODOS });
}

export const filterUncompletedToDos = () => (dispatch) => {
  dispatch({ type: FILTER_UNCOMPLETED_TODOS });
}

export const filterToDoName = (arg) => (dispatch) => {
  dispatch({ type: FILTER_TODO_NAME, payload: arg });
}

export const fetchToDo = (page) => async (dispatch) => {
  dispatch({ type: TODOS_LOADING });
  let toDos = {};
  try {
    const res = await axios.get(`http://localhost:8000/api/tasks/all?page=${page}`);
    toDos = {
      list: [...res.data.data],
      lastPage: res.data.last_page
    }
    console.log(res,toDos);
    dispatch({ type: FETCH_TODOS, payload: toDos });
  } catch (err) {
    console.error(err.message);
  }
}