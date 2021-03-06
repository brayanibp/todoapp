import axios from 'axios';
import { ADD_TODO, DELETE_TODO, FETCH_TODOS, FILTER_ALL_TODOS, FILTER_COMPLETED_TODOS, FILTER_TODO_NAME, FILTER_UNCOMPLETED_TODOS, TODOS_ERROR, TODOS_LOADING, UPDATE_TODO } from "../types/toDoTypes"

export const addToDo = (toDoName) => async (dispatch) => {
  const newToDo = {
    name: toDoName,
    expire_at: null,
    completed: false
  };
  try {
    const res = await axios.post('http://localhost:8000/api/tasks/',newToDo);
    dispatch({ type: ADD_TODO, payload: res.data.task });
    dispatch({ type: FILTER_ALL_TODOS });
  } catch (err) {
    alert(err.message)
    dispatch({ type: TODOS_ERROR, payload: err })
  }
}

export const updateToDo = (toDo) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/tasks/${toDo.id}`,{_method:"PUT", ...toDo})
    dispatch({ type: UPDATE_TODO, payload: res.data.task });
  } catch (err) {
    alert(err.message)
    dispatch({ type: TODOS_ERROR, payload: err })
  }
}

export const deleteToDo = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/api/tasks/${id}`);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (err) {
    alert(err.message)
    dispatch({ type: TODOS_ERROR, payload: err })
  }
}

export const filterAllToDos = (activeFilter, arg) => (dispatch) => {
  if (activeFilter === "all") {
    dispatch({ type: FILTER_ALL_TODOS });
  }
  if (activeFilter === "completed") {
    dispatch({ type: FILTER_COMPLETED_TODOS });  
  }
  if (activeFilter === "uncompleted") {
    dispatch({ type: FILTER_UNCOMPLETED_TODOS });
  }
  if (activeFilter === "name") {
    dispatch({ type: FILTER_TODO_NAME, payload: arg });
  }
}

export const fetchToDo = (activeFilter, lastFilter = "", nextPage, list = []) => async (dispatch) => {
  if(nextPage !== null && nextPage !== undefined) {
    dispatch({ type: TODOS_LOADING });
    try {
      if (activeFilter === lastFilter && nextPage === "") {
        lastFilter = ""
      }
      if (activeFilter !== lastFilter) {
        const res = await axios.get(`http://localhost:8000/api/tasks/${activeFilter}?page=1`);
        const newList = res.data.data.filter(toDo=> ![...list].find(prev=>parseInt(prev.id)===parseInt(toDo.id)));
        if (nextPage!==null && newList.length < 1) {
          const sres = await axios.get(res.data.next_page_url);
          const toDos = {
            currentPage: sres.data.current_page,
            list: [...sres.data.data],
            lastPage: sres.data.last_page,
            nextPage: sres.data.next_page_url,
            activeFilter: activeFilter
          }
          dispatch({ type: FETCH_TODOS, payload: toDos });
          return;
        }
        const toDos = {
          currentPage: res.data.current_page,
          list: [...res.data.data],
          lastPage: res.data.last_page,
          nextPage: res.data.next_page_url,
          activeFilter: activeFilter
        }
        dispatch({ type: FETCH_TODOS, payload: toDos });
        return;
      } else if (activeFilter === lastFilter && nextPage !== "") {
        const res = await axios.get(nextPage);
        let toDos
        if (res.data.data === undefined) {
          toDos = {
            currentPage: res.data.current_page,
            list: [],
            lastPage: res.data.last_page,
            nextPage: res.data.next_page_url,
            activeFilter: activeFilter,
            lastFilter: lastFilter
          }
        } else {
          toDos = {
            currentPage: res.data.current_page,
            list: [...res.data.data],
            lastPage: res.data.last_page,
            nextPage: res.data.next_page_url,
            activeFilter: activeFilter,
            lastFilter: lastFilter
          }
        }
        dispatch({ type: FETCH_TODOS, payload: toDos });
        return;
      } 
    } catch (err) {
      alert(err.message)
      dispatch({ type: TODOS_ERROR, payload: err })
    }
  }
}