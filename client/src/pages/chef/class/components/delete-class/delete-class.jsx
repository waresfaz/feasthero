import React from 'react'

import Button from '../../../../../components/button/button'

import history from '../../../../../history'
import { deleteClass } from '../../../../../services/classes/api'

class DeleteClass extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null
        }
    }

    deleteClass = async () => {
        const response = await deleteClass(this.props.classData._id);
        if (response.error)
            return this.handleDeleteClassError(response.error)

        history.push('/account');
    }

    handleDeleteClassError = (errorResponse) => {
        if (this.errorHasMoreInfo(errorResponse)) {
            this.setState({
                error: errorResponse.data['error']
            });
            return;
        }
        this.setState({
            error: 'error deleting class'
        });
    }

    errorHasMoreInfo(errorResponse) {
        return errorResponse.status === 400 && errorResponse.data['error'];
    }

    render() {
        const { error } = this.state;
        return (
            <>
                <Button className='w-25 py-3' onClick={this.deleteClass} secondary>Delete</Button>
                <span className='text-danger d-block mt-2'>{error}</span>
            </>
        )
    }
}

export default DeleteClass;