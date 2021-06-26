import { ADD_TODO, DELETE_TODO, UPDATE_TODO, FETCH_TODOS, FILTER_ALL_TODOS, FILTER_COMPLETED_TODOS, FILTER_UNCOMPLETED_TODOS, FILTER_TODO_NAME } from "../types/toDoTypes";

const initialState = {
  list: [],
  filteredList: [],
  loading: true,
}

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        list: action.payload,
        filteredList: action.payload,
        loading: false
      }

    case FILTER_ALL_TODOS:
      return {
        ...state,
        filteredList: [...state.list]
      }

    case FILTER_COMPLETED_TODOS:
      return {
        ...state,
        filteredList: state.list.filter(toDo=>toDo.completed === true)
      }
    
    case FILTER_UNCOMPLETED_TODOS:
      return {
        ...state,
        filteredList: state.list.filter(toDo=>toDo.completed === false)
      }
    
    case FILTER_TODO_NAME:
      return {
        ...state,
        filteredList: state.list.filter(toDo=>String(toDo.name).toLowerCase().includes(String(action.payload).toLowerCase()))
      }

    case ADD_TODO:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload,
        ],
        loading: false
      }

    case UPDATE_TODO:
      const toDo = { 
        ...state.list.find(toDo=>toDo.id === action.payload.id),
        ...action.payload,
      };
      const toDoList = [
        ...state.list.filter(toDo=>toDo.id !== action.payload.id),
        toDo, 
      ];
      return {
        ...state,
        list: [
          ...toDoList.sort((a,b)=>a.id-b.id)
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        list: [
          ...state.list.filter(toDo=>parseInt(toDo.id)!==parseInt(action.payload))
        ]
      }

    default:
      return { ...state };
  }
}

export default toDoReducer;