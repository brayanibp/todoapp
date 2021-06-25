const { ADD_TODO, DELETE_TODO, UPDATE_TODO } = require("../types/toDoTypes");

// toDo basic structure
// toDo: {
//   id: 0,
//   name: "",
//   expire_at: "",
//   completed: false,
// }

const initialState = {
  list: [],
  loading: true,
}

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [
          action.payload,
          ...state.list
        ],
        loading: false
      }

    case UPDATE_TODO:
      const toDo = { 
        ...state.list.find(toDo=>toDo.id === action.payload.id),
        name: action.payload.name,
        expire_at: action.payload.expire_at,
        completed: action.payload.completed
      }
      const toDoList = [
        ...state.list.filter(toDo=>toDo.id !== action.payload.id),
        toDo, 
      ]
      return {
        ...state,
        list: [
          ...toDoList.sort((a,b)=>a.id-b.id).reverse()
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        list: [
          ...state.list.filter(toDo=>toDo.id!==action.payload.id)
        ]
      }

    default:
      return { ...state };
  }
}

export default toDoReducer;