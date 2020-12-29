import {
    ADD_TODO
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
  
      default:
        return state
    }
  }