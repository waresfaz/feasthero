import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';

import Button from '../../../../../../../../../components/button/button';

import { getAllClasses } from '../../../../../../../../../services/chef/actions';
import { addSchedule } from '../../../../../../../../../services/schedule/api';


class AddScheduleModal extends React.Component {
    constructor() {
        super();
        this.state = {
            dateTime: null,
            errors: {},
            loading: false,
        }
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

    addSchedule = async () => {
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
        this.props.hide();
    }

    render() {
        return (
            <>
                <Modal show={this.props.shouldShow} onHide={this.props.hide}>
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
                        <Button className='modal-btn' secondary onClick={this.props.hide}>
                            Close
                        </Button>
                        <Button type='submit' onClick={this.addSchedule} className='modal-btn'>
                            Add Schedule
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(null, mapDispatchToProps)(AddScheduleModal);