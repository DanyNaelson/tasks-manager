import { Col, Form, Row, Button } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions';
import { connect } from 'react-redux';

/**
 * Component styles (CSS-in-JS)
 */
const styles = {
    selectForm: {
        width: 60
    }
}

const ToDoForm = ({ showForm, actions }) => {
    const [taskName, setTaskName] = useState("")
    const [hours, setHours] = useState("0")
    const [minutes, setMinutes] = useState("0")
    const [seconds, setSeconds] = useState("0")

    /**
     * Confirm creation of the task to the store
     */
    const saveTodo = () => {
        actions.addTodo(taskName, `${hours}:${timeFormat(minutes)}:${timeFormat(seconds)}`)
        setTaskName("")
        setHours("0")
        setMinutes("0")
        setSeconds("0")
        showForm(false)
    }

    /**
     * Convert minutes and seconds to string format
     * @param {String} time 
     */
    const timeFormat = time => {
        if(time.length === 1){
            time = `0${time}`
        }

        return time
    }

    /**
     * Change hours value to the state
     * @param {*} event 
     */
    const changeSelectHours= (event) => {
        if(event.target.value === "2"){
            setMinutes("0")
            setSeconds("0")
        }
        setHours(event.target.value) 
    }

    /**
     * Change minutes value to the state
     * @param {*} event 
     */
    const changeSelectMinutes= (event) => { 
        setMinutes(event.target.value); 
    }

    /**
     * Change seconds value to the state
     * @param {*} event 
     */
    const changeSelectSeconds= (event) => { 
        setSeconds(event.target.value); 
    }

    return (
        <Col md="auto">
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.taskName">
                            <Form.Label>Task name</Form.Label>
                            <Form.Control placeholder="Task name" value={taskName} onChange={e => setTaskName(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="exampleForm.hours">
                            <Form.Label>Duration</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Group controlId="exampleForm.hours">
                                        <Form.Label>Hours</Form.Label>
                                        <Form.Control
                                            style={styles.selectForm}
                                            as="select"
                                            value={hours}
                                            onChange={e => changeSelectHours(e)}
                                        >
                                        {Array.from({length: 3}, (_, i) => i).map(hour =>
                                            <option value={hour} key={hour}>{hour}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.minutes">
                                        <Form.Label>Minutes</Form.Label>
                                        <Form.Control
                                            style={styles.selectForm}
                                            as="select"
                                            value={minutes}
                                            onChange={e => changeSelectMinutes(e)}
                                            disabled={hours === "2"}
                                        >
                                        {Array.from({length: 60}, (_, i) => i).map(minute =>
                                            <option value={minute} key={minute}>{minute}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.seconds">
                                        <Form.Label>Seconds</Form.Label>
                                        <Form.Control
                                            style={styles.selectForm}
                                            as="select"
                                            value={seconds}
                                            onChange={e => changeSelectSeconds(e)}
                                            disabled={hours === "2"}
                                        >
                                        {Array.from({length: 60}, (_, i) => i).map(second =>
                                            <option value={second} key={second}>{second}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="success"
                            onClick={() => saveTodo()}
                            disabled={taskName === "" || (hours === "0" && minutes === "0" && seconds === "0")}
                        >
                            <CheckCircleFill/>
                        </Button>
                        <Button variant="danger"
                            onClick={() => showForm(false)}
                        >
                            <XCircleFill/>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
};

const mapStateToProps = state => ({
    todos: state.todos
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoForm)