import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO,
    COMPLETE_TODO
} from '../constants/ActionTypes'
  
const initialState = []

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.length + 1,
          status: "UNINITIATED",
          taskName: action.taskName,
          initialDuration: action.initialDuration,
          remainingDuration: action.remainingDuration
        }
      ]

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, 
            taskName: action.taskName,
            initialDuration: action.initialDuration,
            remainingDuration: action.remainingDuration
          } :
          todo
      )

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )
    
    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, 
            status: "COMPLETED"
          } :
          todo
      )

    default:
      return state
  }
}