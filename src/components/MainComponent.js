import React from 'react';
import { Navbar } from 'react-bootstrap';
import AddToDo from '../components/AddToDo';
import ToDoList from '../components/ToDoList';

const MainComponent = ({ todos }) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Tasks manager</Navbar.Brand>
            </Navbar>
            <AddToDo />
            <ToDoList todos={todos} />
        </>
    );
};

export default MainComponent;