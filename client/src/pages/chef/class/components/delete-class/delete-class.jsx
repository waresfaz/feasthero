import React from 'react'

import Button from '../../../../../components/button/button'

import history from '../../../../../history'
import { deleteClass } from '../../../../../services/classes/api'

class DeleteClass extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {}
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
                errors: errorResponse.data['errors']
            });
            return;
        }
        this.setState({
            errors: 'error deleting class'
        });
    }

    errorHasMoreInfo(errorResponse) {
        console.log(errorResponse);
        return (errorResponse.status === 400 || errorResponse.status === 401) && errorResponse.data['errors'];
    }

    render() {
        const { errors } = this.state;
        return (
            <div className='mt-5'>
                <Button className='w-25 py-3' onClick={this.deleteClass} secondary>Delete</Button>
                <span className='text-danger d-block mt-2'>{errors['error']}</span>
            </div>
        )
    }
}

export default DeleteClass;