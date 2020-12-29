import React from 'react';
import { Table } from 'react-bootstrap';
import TodoItem from './TodoItem';

const ToDoList = ({ todos }) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Initial Duration (h:mm:ss)</th>
                    <th>Remaining Duration (h:mm:ss)</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {todos.map(todo =>
                <TodoItem key={todo.id} todo={todo} />
            )}
            </tbody>
        </Table>
    );
};

export default ToDoList;