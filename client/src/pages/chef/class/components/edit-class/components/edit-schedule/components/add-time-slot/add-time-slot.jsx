import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';

import Button from '../../../../../../../../../components/button/button';

import { getAllClasses } from '../../../../../../../../../services/chef/actions';
import { addSchedule } from '../../../../../../../../../services/schedule/api';

import './add-time-slot.scss';

class AddTimeSlot extends React.Component {
    constructor() {
        super();
        this.state = {
            dateTime: null,
            errors: {},
            loading: false,
            showAddTimeSlotModal: false,
        }
    }

    showAddTimeSlotModal = () => {
        this.setState({
            showAddTimeSlotModal: true,
        })
    }

    hideAddTimeSlotModal = () => {
        this.setState({
            showAddTimeSlotModal: false,
        })
    }


    startLoading = () => {
        this.setState({
            loading: true,
        })
    }

    stopLoading = () => {
        this.setState({
            loading: false,
        })
    }

    onDateTimeChange = (evt) => {
        this.setState({
            dateTime: evt,
        })
    }

    addTimeSlot = async () => {
        this.startLoading();
        const response = await addSchedule(this.props.classId, this.state.dateTime);
        if (!response) {
            this.setState({
                errors: { error: 'error adding schedule' },
                loading: false,
            });
            return;
        }

        this.props.getAllClasses();
        this.stopLoading();
        this.hideAddTimeSlotModal();
    }

    render() {
        return (
            <div id='add-time-slot'>
                <Modal show={this.state.showAddTimeSlotModal} onHide={this.hideAddTimeSlotModal}>
                    <Modal.Header>
                        <Modal.Title>Add Schedule</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center'>
                            <DateTimePicker value={this.state.dateTime} onChange={this.onDateTimeChange} />
                            <span className='text-danger'>{this.state.errors['error']}</span>
                        </div>
                        {
                            this.state.loading
                                ?
                                <div className='d-flex mt-2 justify-content-center'>
                                    <Spinner animation='border' />
                                </div>
                                :
                                <></>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='modal-btn' secondary onClick={this.hideAddTimeSlotModal}>
                            Close
                        </Button>
                        <Button type='submit' onClick={this.addTimeSlot} className='modal-btn'>
                            Add Schedule
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div id='add-time-slot-btn' onClick={this.showAddTimeSlotModal}>
                    <FontAwesomeIcon className='plus' icon={faPlus} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(null, mapDispatchToProps)(AddTimeSlot);