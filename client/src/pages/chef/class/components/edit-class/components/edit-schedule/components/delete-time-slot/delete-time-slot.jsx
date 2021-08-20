import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

import Loader from '../../../../../../../../../components/loader/loader';

import { deleteTimeSlot } from '../../../../../../../../../services/schedule/api';
import { getAllClasses } from '../../../../../../../../../services/chef/actions';

import './delete-time-slot.scss';

class DeleteTimeSlot extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            errors: {},
        };
    }

    deleteTimeSlot = async () => {
        this.setState({
            loading: true
        })
        const response = await deleteTimeSlot(this.props.timeSlotId, this.props.classId);

        if (response.error)
            return this.handleDeleteTimeSlotError(response.error);

        this.props.getAllClasses();

        this.setState({
            loading: false,
        });

    }

    handleDeleteTimeSlotError(errorResponse) {
        if (this.requestErrorHasMoreInfo(errorResponse)) {
            this.setState({
                loading: false,
                errors: errorResponse.data['errors'],
            });
            return;
        }

        this.setState({
            loading: false,
            errors: { error: 'something went wrong...' }
        });
    }

    requestErrorHasMoreInfo(errorResponse) {
        return (errorResponse.status === 400 || errorResponse.status === 401) && errorResponse.data['errors'];
    }

    render() {
        return (
            <>
                <Loader show={this.state.loading} />
                <div className='delete-time-slot'>
                    <FontAwesomeIcon className='trash' onClick={this.deleteTimeSlot} icon={faTrash} />
                    <span className='text-danger d-block'>{this.state.errors['error']}</span>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(null, mapDispatchToProps)(DeleteTimeSlot);