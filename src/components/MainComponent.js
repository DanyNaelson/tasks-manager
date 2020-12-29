import React from 'react';
import { Col, Navbar, Row } from 'react-bootstrap';
import AddToDo from '../components/AddToDo';
import ToDoList from '../components/ToDoList';

const MainComponent = ({ todos }) => {
    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <Navbar bg="light" expand="sm">
                            <Navbar.Brand href="#home">Tasks manager</Navbar.Brand>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AddToDo />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ToDoList todos={todos} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default MainComponent;