import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import './edit-schedule.scss';
import AddScheduleModal from './components/add-schedule-modal/add-schedule-modal';

class EditSchedule extends React.Component {
    constructor() {
        super();
        this.state = {
            showAddScheduleModal: false,
        }
    }

    showAddScheduleModal = () => {
        this.setState({
            showAddScheduleModal: true,
        })
    }

    hideAddScheduleModal = () => {
        this.setState({
            showAddScheduleModal: false,
        })
    }

    render() {
        return (
            <>
                <AddScheduleModal classId={this.props.classData._id} shouldShow={this.state.showAddScheduleModal} hide={this.hideAddScheduleModal} />
                <section id='edit-schedule'>
                    {
                        this.props.classData.schedule.map((schedule, key) => {
                            return (
                                <div key={key} className='schedule'>
                                    <Row className='justify-content-center'>
                                        <Col sm={1}>
                                            <FontAwesomeIcon className='trash' icon={faTrash} />
                                        </Col>
                                        <Col sm={4}>
                                            <p>{schedule.dateTime}</p>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                    <div className='show-add-schedule-modal-btn' onClick={this.showAddScheduleModal}>
                        <FontAwesomeIcon className='plus' icon={faPlus} />
                    </div>
                </section>
            </>
        )
    }
}

export default EditSchedule;