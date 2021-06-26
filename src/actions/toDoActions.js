import { ADD_TODO, DELETE_TODO, FETCH_TODOS, UPDATE_TODO } from "../types/toDoTypes"

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

export const fetchToDo = () => (dispatch) => {
  const toDos = [
    {
      id: 1,
      name: "Crear interfaz",
      expire_at: null,
      completed: false
    },
    {
      id: 2,
      name: "Crear API rest",
      expire_at: null,
      completed: false
    },
    {
      id: 3,
      name: "Entregar",
      expire_at: null,
      completed: false
    }
  ]
  dispatch({ type: FETCH_TODOS, payload: toDos });
}