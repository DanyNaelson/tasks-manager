import React from 'react';
import { Button } from 'react-bootstrap';
import { Check2Circle, PencilFill, PlayCircleFill, Trash2Fill } from 'react-bootstrap-icons';

const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.taskName}</td>
            <td>{todo.initialDuration}</td>
            <td>{todo.remainingDuration}</td>
            <td>{todo.status}</td>
            <td>
                <Button variant="primary">
                    <PlayCircleFill/>
                    Start
                </Button>
                <Button variant="success">
                    <Check2Circle/>
                    Complete
                </Button>
                <Button variant="info">
                    <PencilFill/>
                    Edit
                </Button>
                <Button variant="danger">
                    <Trash2Fill/>
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default TodoItem;