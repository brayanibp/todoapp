import { ADD_TODO, DELETE_TODO, UPDATE_TODO, FETCH_TODOS, FILTER_ALL_TODOS, FILTER_COMPLETED_TODOS, FILTER_UNCOMPLETED_TODOS, FILTER_TODO_NAME, TODOS_LOADING } from "../types/toDoTypes";

const initialState = {
  list: [],
  filteredList: [],
  loading: true,
  currentPage: 0,
  nextPage: "",
  lastPage: 1,
  activeFilter: "all",
  lastFilter: ""
}

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_TODOS:
      //FILTERING NEW TO DOS
      const newList = action.payload.list.filter(toDo=> ![...state.list].find(prev=>parseInt(prev.id)===parseInt(toDo.id)));
      return {
        ...state,
        list: [
          ...state.list,
          ...newList
        ],
        filteredList: [
          ...state.filteredList,
          ...newList
        ],
        currentPage: action.payload.currentPage,
        nextPage: action.payload.nextPage,
        lastPage: action.payload.lastPage,
        loading: false,
        activeFilter: action.payload.activeFilter,
        lastFilter: state.activeFilter
      }

    case FILTER_ALL_TODOS:
      return {
        ...state,
        filteredList: [...state.list],
        activeFilter: "all",
        nextPage: "",
      }

    case FILTER_COMPLETED_TODOS:
      return {
        ...state,
        filteredList: state.list.filter(toDo => Boolean(toDo.completed) === true),
        activeFilter: "completed",
        nextPage: ""
      }

    case FILTER_UNCOMPLETED_TODOS:
      return {
        ...state,
        filteredList: state.list.filter(toDo => Boolean(toDo.completed) === false),
        activeFilter: "uncompleted",
        nextPage: ""
      }

    case FILTER_TODO_NAME:
      if (action.payload.length < 1) {
        return {
          ...state,
          filteredList: [...state.list],
          activeFilter: "name",
          nextPage: ""
        }
      }
      return {
        ...state,
        filteredList: state.list.filter(toDo => String(toDo.name).toLowerCase().includes(String(action.payload).toLowerCase())),
        activeFilter: "name",
        nextPage: ""
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
        ...state.list.find(toDo => toDo.id === action.payload.id),
        ...action.payload,
      };
      const toDoList = [
        ...state.list.filter(toDo => toDo.id !== action.payload.id),
        toDo,
      ];
      return {
        ...state,
        list: [
          ...toDoList.sort((a, b) => a.id - b.id)
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        list: [
          ...state.list.filter(toDo => parseInt(toDo.id) !== parseInt(action.payload))
        ]
      }

    default:
      return { ...state };
  }
}

export default toDoReducer;