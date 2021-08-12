import React from 'react'
import { Form } from 'react-bootstrap'

import { updateClass } from '../../../../../services/classes/api';

import BooleanValidator from '../../../../../validators/boolean';
import NumberValidator from '../../../../../validators/number';

import Button from '../../../../../components/button/button'
import Loader from '../../../../../components/loader/loader'

import './edit-class.scss'

class EditClass extends React.Component {
    constructor(props) {
        super(props);
        const { classData } = props;

        this.state = {
            title: classData.title,
            description: classData.description,
            duration: classData.duration,
            cost: classData.cost,
            mealKitCost: classData.mealKitCost,
            hasMealKit: classData.hasMealKit,
            errors: {},
            loading: false,
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.clearErrors();
        if (!this.validate())
            return;
        this.setState({ loading: true });
        const updateClassResponse = await updateClass(this.props.classData._id, this.classDataFromState());
        if (updateClassResponse.error)
            this.handleUpdateError(updateClassResponse.error);
        this.setState({ loading: false });
    }

    clearErrors = () => {
        this.setState({
            errors: {}
        });
    }

    validate = () => {
        let errors = {};

        errors['cost'] = NumberValidator.validate(this.state.cost);
        errors['mealKitCost'] = NumberValidator.validate(this.state.mealKitCost);
        errors['hasMealKit'] = BooleanValidator.validate(this.state.hasMealKit);

        let valid = Object.values(errors).every(error => error === null);
        if (!valid)
            this.setState({ errors });

        return valid;
    }

    handleUpdateError = (errorResponse) => {
        if (this.requestErrorHasAdditionalInfo(errorResponse)) {
            this.setState({
                errors: errorResponse.data['errors'],
                loading: false,
            });
            return;
        }
        this.setState({
            errors: { error: 'Failed to update, please try again' },
            loading: false,
        });
    }

    requestErrorHasAdditionalInfo = (errorResponse) => {
        return (errorResponse.status === 400 || errorResponse.status === 409) && errorResponse.data['errors'];
    }

    classDataFromState = () => {
        return {
            title: this.state.title,
            description: this.state.description,
            duration: this.state.duration,
            cost: this.state.cost,
            mealKitCost: this.state.mealKitCost,
            hasMealKit: this.state.hasMealKit,
        }
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    render() {
        const { errors } = this.state;

        return (
            <section id='edit-class'>
                <Loader show={this.state.loading} />
                <form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={this.handleChange} type='text' name='title' value={this.state.title} />
                        <span className='text-danger'>{errors['title']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleChange} type='text' as='textarea' name='description' value={this.state.description} />
                        <span className='text-danger'>{errors['description']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control onChange={this.handleChange} type='number' name='duration' value={this.state.duration} />
                        <span className='text-danger'>{errors['duration']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control onChange={this.handleChange} type='number' name='cost' value={this.state.cost} />
                        <span className='text-danger'>{errors['cost']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Meal Kit Cost</Form.Label>
                        <Form.Control onChange={this.handleChange} type='number' name='mealKitCost' value={this.state.mealKitCost} />
                        <span className='text-danger'>{errors['mealKitCost']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Offers Meal Kit</Form.Label>
                        <Form.Check onChange={this.handleChange} name='hasMealKit' checked={this.state.hasMealKit} />
                        <span className='text-danger'>{errors['hasMealKit']}</span>
                    </Form.Group>
                    <span className='text-danger text-center'>{errors['error']}</span>
                    <Button isButton={true} className='p-3 w-100'>Update</Button>
                </form>
            </section>
        )
    }
}

export default EditClass;