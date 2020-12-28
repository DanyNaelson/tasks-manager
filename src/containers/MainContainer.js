import React from 'react';
import AddToDo from '../components/AddToDo';
import ToDoList from '../components/ToDoList';

const MainContainer = () => {
    return (
        <div>
            <AddToDo />
            <ToDoList />
        </div>
    );
};

export default MainContainer;