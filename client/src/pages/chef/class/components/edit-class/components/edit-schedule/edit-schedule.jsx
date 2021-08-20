import React from 'react';
import { Col, Row } from 'react-bootstrap';

import AddTimeSlot from './components/add-time-slot/add-time-slot';
import DeleteTimeSlot from './components/delete-time-slot/delete-time-slot';

import './edit-schedule.scss';

class EditSchedule extends React.Component {

    render() {
        return (
            <>
                <section id='edit-schedule'>
                    {
                        this.props.classData.schedule.map((timeSlot, key) => {
                            return (
                                <div key={key} className='schedule'>
                                    <Row className='justify-content-center'>
                                        <Col sm={1}>
                                            <DeleteTimeSlot classId={this.props.classData._id} timeSlotId={timeSlot._id} />
                                        </Col>
                                        <Col sm={4}>
                                            <p>{timeSlot.dateTime}</p>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </section>
                <div>
                    <AddTimeSlot classId={this.props.classData._id} />
                </div>
            </>
        )
    }
}

export default EditSchedule;