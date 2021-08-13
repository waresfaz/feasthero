import React from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap';

import BooleanValidator from '../../../../../../validators/boolean';
import NotEmptyValidator from '../../../../../../validators/not-empty';
import NumberValidator from '../../../../../../validators/number';
import UrlValidator from '../../../../../../validators/url';

import { newClass } from '../../../../../../services/classes/api';

import Button from '../../../../../../components/button/button';

import './add-class.scss'
import { connect } from 'react-redux';
import { getAllClasses } from '../../../../../../services/chef/actions';
import classDataFromState from '../../../../../../helpers/class-data-from-state';

class AddClass extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            thumbnail: '',
            duration: null,
            costPerDevice: null,
            mealKitCost: null,
            hasMealKit: false,
            showModal: false,
            loading: false,
            errors: {}
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();

        this.clearErrors();

        if (!this.validate())
            return;

        this.setState({ loading: true });

        const newClassResponse = await newClass(classDataFromState(this.state));
        if (newClassResponse.error)
            return this.handleAddError(newClassResponse.error);

        this.props.getAllClasses();

        this.setState({
            loading: false,
            showModal: false,
        });
    }

    clearErrors = () => {
        this.setState({
            errors: {}
        });
    }

    validate = () => {
        let errors = {};

        errors['title'] = NotEmptyValidator.validate(this.state.title);
        errors['description'] = NotEmptyValidator.validate(this.state.description);
        errors['thumbnail'] = UrlValidator.validate(this.state.thumbnail);
        errors['costPerDevice'] = NumberValidator.validate(this.state.costPerDevice);
        errors['duration'] = NumberValidator.validate(this.state.duration);
        errors['mealKitCost'] = NumberValidator.validate(this.state.mealKitCost);
        errors['hasMealKit'] = BooleanValidator.validate(this.state.hasMealKit);

        let valid = Object.values(errors).every(error => error === null);
        if (!valid)
            this.setState({ errors });

        return valid;
    }

    handleAddError = (errorResponse) => {
        if (this.requestErrorHasAdditionalInfo(errorResponse)) {
            this.setState({
                errors: errorResponse.data['errors'],
                loading: false,
            });
            return;
        }
        this.setState({
            errors: { error: 'Failed to add class, please try again' },
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

    showModal = () => {
        this.setState({
            showModal: true,
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
        })
    }

    render() {
        const { errors } = this.state;

        return (
            <div id='add-class'>
                <Button className='mb-4 p-3' onClick={this.showModal}>Add Class</Button>
                <Modal size='lg' id='add-class-modal' show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Add Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                    type='text'
                                    placeholder='title'
                                    name='title'
                                />
                                <span className='text-danger'>{errors['title']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.description}
                                    type='text'
                                    as='textarea'
                                    placeholder='description'
                                    name='description'
                                />
                                <span className='text-danger'>{errors['description']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.thumbnail}
                                    type='text'
                                    placeholder='thumbnail'
                                    name='thumbnail'
                                />
                                <span className='text-danger'>{errors['thumbnail']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.duration}
                                    type='number'
                                    placeholder='duration'
                                    name='duration'
                                />
                                <span className='text-danger'>{errors['duration']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.costPerDevice}
                                    type='number'
                                    placeholder='cost per device'
                                    name='costPerDevice'
                                />
                                <span className='text-danger'>{errors['costPerDevice']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.mealKitCost}
                                    type='number'
                                    placeholder='meal kit cost'
                                    name='mealKitCost'
                                />
                                <span className='text-danger'>{errors['mealKitCost']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Offers Meal Kit</Form.Label>
                                <Form.Check
                                    onCheck={this.handleCheckBoxChange}
                                    value={this.state.hasMealKit}
                                    name='hasMealKit'
                                />
                                <span className='text-danger'>{errors['hasMealKit']}</span>
                            </Form.Group>

                            <span className='text-danger d-block text-center'>{errors['error']}</span>

                            {
                                this.state.loading
                                    ?
                                    <div className='d-flex justify-content-center'>
                                        <Spinner animation='border' />
                                    </div>
                                    :
                                    <></>
                            }


                            <Modal.Footer>
                                <Button className='modal-btn' secondary onClick={this.closeModal}>
                                    Close
                                </Button>
                                <Button type='submit' isButton={true} className='modal-btn'>
                                    Add Class
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
    }
}

export default connect(null, mapDispatchToProps)(AddClass);