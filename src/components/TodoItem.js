import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { CheckCircleFill, PauseCircleFill, PencilFill, PlayCircleFill, Trash2Fill, XCircleFill } from 'react-bootstrap-icons';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';

/**
 * Component styles (CSS-in-JS)
 */
const styles = {
    selectForm: {
        width: 60
    }
}

/**
 * Divide duration to get hours, minutes and seconds
 * @param {String} duration 
 */
const durationSplit = duration => {
    const durationSplit = duration.split(":")
    const todoHours = durationSplit[0]
    const todoMinutes = parseInt(durationSplit[1]).toString()
    const todoSeconds = parseInt(durationSplit[2]).toString()

    return { todoHours, todoMinutes, todoSeconds }
}

const TodoItem = ({ todo, actions }) => {
    const { todoHours, todoMinutes, todoSeconds } = durationSplit(todo.initialDuration)
    const [taskName, setTaskName] = useState(todo.taskName ? todo.taskName : "")
    const [hours, setHours] = useState(todoHours ? todoHours : "0")
    const [minutes, setMinutes] = useState(todoMinutes ? todoMinutes : "0")
    const [seconds, setSeconds] = useState(todoSeconds ? todoSeconds : "0")
    const [editMode, setEditMode] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [durationTime, setRemainingDuration] = useState(moment.duration(todo.remainingDuration))

    useEffect(() => {
        let intervalId;

        if (todo.status === 'IN PROGRESS' && !isActive){
            setIsActive(true)
        }
        
        if (isActive) {
          intervalId = setInterval(() => {
            if (durationTime.as('seconds') > 0) {
                setRemainingDuration(durationTime.subtract(1, 'second'))
                actions.editRemaining(todo.id, `${durationTime.get('hours')}:${timeFormat(durationTime.get('minutes'))}:${timeFormat(durationTime.get('seconds'))}`)
            } else {
                setIsActive(false)
                actions.completeTodo(todo.id)
            }
          }, 1000)
        }
    
        return () => clearInterval(intervalId);
      })

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

    /**
     * Confirm edition of the task to the store
     */
    const editTodo = () => {
        actions.editTodo(todo.id, taskName, `${hours}:${timeFormat(minutes)}:${timeFormat(seconds)}`)
        setEditMode(false)
    }

    /**
     * Delete task to the store
     */
    const deleteTodo = () => {
        actions.deleteTodo(todo.id)
    }

    /**
     * Complete task
     */
    const completeTodo = () => {
        actions.completeTodo(todo.id)
    }

    /**
     * Start task
     */
    const startTask = () => {
        actions.startTodo(todo.id)
        setIsActive(true)
    }

    /**
     * Pause task
     */
    const pauseTask = () => {
        actions.pauseTodo(todo.id)
        setIsActive(false)
    }

    return (
        <tr>
            <td>{todo.id}</td>
            <td>
            {editMode ?
                <Form.Group controlId="exampleForm.taskName">
                    <Form.Label>Task name</Form.Label>
                    <Form.Control placeholder="Task name" value={taskName} onChange={e => setTaskName(e.target.value)} />
                </Form.Group> :
                todo.taskName
            }
            </td>
            <td>
            {
                editMode ?
                <Form.Group controlId="exampleForm.hours">
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
                :
                todo.initialDuration
            }
            </td>
            <td>{`${durationTime.get('hour')}:${durationTime.get('minutes')}:${durationTime.get('seconds')}`}</td>
            <td>{todo.status}</td>
        {todo.status !== 'COMPLETED' &&
            <td>
            {!editMode &&
                !isActive ?
                <Button variant="primary"
                    onClick={() => startTask()}
                >
                    <PlayCircleFill/>
                    Start
                </Button> :
                <Button variant="info"
                    onClick={() => pauseTask()}
                >
                    <PauseCircleFill/>
                    Pause
                </Button>
            }
            {!editMode && todo.status !== 'IN PROGRESS' &&
                <Button variant="success"
                    onClick={() => completeTodo()}
                >
                    <CheckCircleFill/>
                    Complete
                </Button>
            }
            {editMode ?
                <Button variant="success" onClick={() => editTodo()}
                    disabled={taskName === "" || (hours === "0" && minutes === "0" && seconds === "0")}
                >
                    <CheckCircleFill/>
                    Confirm
                </Button> :
                todo.status !== 'IN PROGRESS' &&
                <Button variant="info" onClick={() => setEditMode(true)}>
                    <PencilFill/>
                </Button>
            }
            {editMode ?
                <Button variant="danger" onClick={() => setEditMode(false)}>
                    <XCircleFill/>
                    Cancel
                </Button>:
                todo.status !== 'IN PROGRESS' &&
                <Button variant="danger" onClick={() => deleteTodo()}>
                    <Trash2Fill/>
                </Button>
            }
            </td>
        }
        </tr>
    );
};

const mapStateToProps = state => ({
    todos: state.todos
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

/**
 * Redux connection
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoItem)