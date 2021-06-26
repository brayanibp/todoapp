const { ADD_TODO, DELETE_TODO, UPDATE_TODO, FETCH_TODOS } = require("../types/toDoTypes");

const initialState = {
  list: [],
  filtered: [],
  loading: true,
}

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        list: action.payload,
        filtered: action.payload,
        loading: false
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
        name: action.payload.name,
        expire_at: action.payload.expire_at,
        completed: action.payload.completed
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