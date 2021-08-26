import React from 'react'
import { Form } from 'react-bootstrap'

import { updateClass } from '../../../../../services/classes/api';
import classDataFromState from '../../../../../helpers/class-data-from-state';

import BooleanValidator from '../../../../../validators/boolean';
import NumberValidator from '../../../../../validators/number';
import NotEmptyValidator from '../../../../../validators/not-empty';

import Button from '../../../../../components/button/button'
import Loader from '../../../../../components/loader/loader'
import EditSchedule from './components/edit-schedule/edit-schedule';

import './edit-class.scss'
import { connect } from 'react-redux';


class EditClass extends React.Component {
    constructor(props) {
        super(props);
        const { classData } = props;

        this.state = {
            title: classData.title,
            description: classData.description,
            duration: classData.duration,
            costPerDevice: classData.costPerDevice,
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
        const updateClassResponse = await updateClass(this.props.classData._id, classDataFromState(this.state));
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

        errors['title'] = NotEmptyValidator.validate(this.state.description);
        errors['description'] = NotEmptyValidator.validate(this.state.description);
        errors['costPerDevice'] = NumberValidator.validate(this.state.costPerDevice);
        errors['duration'] = NumberValidator.validate(this.state.duration);
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

    handleChange = (evt) => {
        const { name, value } = evt.target;

        this.setState({
            [name]: value,
        })
    }

    handleCheckBoxChange = (evt) => {
        const { name } = evt.target;
        let value = !this.state[name];
        this.setState({
            [name]: value,
        })
    }

    handleFileUploadChange = (evt) => {
        const file = evt.target.files[0];
        const { name } = evt.target;

        this.setState({
            [name]: file
        });
    }

    render() {
        const { errors } = this.state;

        return (
            <>
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
                            <Form.Label>Thumbnail</Form.Label>
                            <Form.Control type='file' name='thumbnail' onChange={this.handleFileUploadChange} />
                            <span className='text-danger'>{errors['thumbnail']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control onChange={this.handleChange} type='number' name='duration' value={this.state.duration} />
                            <span className='text-danger'>{errors['duration']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cost Per Device</Form.Label>
                            <Form.Control onChange={this.handleChange} type='number' name='costPerDevice' value={this.state.costPerDevice} />
                            <span className='text-danger'>{errors['costPerDevice']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Meal Kit Cost</Form.Label>
                            <Form.Control onChange={this.handleChange} type='number' name='mealKitCost' value={this.state.mealKitCost} />
                            <span className='text-danger'>{errors['mealKitCost']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Offers Meal Kit</Form.Label>
                            <Form.Check onChange={this.handleCheckBoxChange} name='hasMealKit' checked={this.state.hasMealKit} />
                            <span className='text-danger'>{errors['hasMealKit']}</span>
                        </Form.Group>
                        <div className='w-100'>
                            <span className='text-danger d-block text-center'>{errors['error']}</span>
                        </div>
                        <Button isButton={true} className='p-3 w-100'>Update</Button>
                    </form>
                </section>
                <section className='mt-4'>
                    <EditSchedule />
                </section>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classData: state.chef.currentClass,
    }
}

export default connect(mapStateToProps)(EditClass);