import { Button, Col, Row } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ToDoForm from './ToDoForm';

const AddToDo = () => {
    const [showToDoForm, setShowToDoForm] = useState(false);

    const showForm = show => setShowToDoForm(show)

    return (
        <Row className="justify-content-md-center">
            <CSSTransition in={showToDoForm} timeout={500} classNames="animatedNode">
            {showToDoForm ?
                <ToDoForm showForm={showForm}/>
                :
                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => showForm(true)}>
                            <PlusCircleFill/>
                            Add task
                        </Button>
                    </Col>
                </Row>
            }
            </CSSTransition>
        </Row>
    );
};

export default AddToDo;