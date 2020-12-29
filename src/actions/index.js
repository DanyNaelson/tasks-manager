import * as types from '../constants/ActionTypes'

export const addTodo = (taskName, initialDuration) => ({ type: types.ADD_TODO, taskName, initialDuration, remainingDuration: initialDuration })