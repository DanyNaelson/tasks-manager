import * as types from '../constants/ActionTypes'

export const addTodo = (taskName, initialDuration) => ({
    type: types.ADD_TODO,
    taskName,
    initialDuration,
    remainingDuration: initialDuration
})

export const editTodo = (taskId, taskName, initialDuration) => ({
    type: types.EDIT_TODO,
    id: taskId,
    taskName, initialDuration,
    remainingDuration: initialDuration
})

export const deleteTodo = id => ({
    type: types.DELETE_TODO, id
})