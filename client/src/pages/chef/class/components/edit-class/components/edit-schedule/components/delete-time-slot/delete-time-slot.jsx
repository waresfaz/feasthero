import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './delete-time-slot.scss';

class DeleteTimeSlot extends React.Component {
    render() {
        return (
            <div className='delete-time-slot'>
                <FontAwesomeIcon className='trash' icon={faTrash} />
            </div>
        );
    }
}

export default DeleteTimeSlot;