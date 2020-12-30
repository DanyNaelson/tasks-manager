import * as types from '../constants/ActionTypes'

export const addTodo = (taskName, initialDuration) => ({
    type: types.ADD_TODO,
    taskName,
    initialDuration,
    remainingDuration: initialDuration,
    
})

export const editTodo = (taskId, taskName, initialDuration) => ({
    type: types.EDIT_TODO,
    id: taskId,
    taskName,
    initialDuration,
    remainingDuration: initialDuration
})

export const deleteTodo = id => ({
    type: types.DELETE_TODO, id
})

export const completeTodo = id => ({
    type: types.COMPLETE_TODO, id
})

export const startTodo = id => ({
    type: types.START_TODO, id
})

export const pauseTodo = id => ({
    type: types.PAUSE_TODO, id
})

export const editRemaining = (taskId, remainingDuration) => ({
    type: types.CHANGE_REMAINING,
    id: taskId,
    remainingDuration: remainingDuration
})