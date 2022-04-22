import React from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addClass, hideAddClassModal, showAddClassModal } from '../../../../../../services/chef/actions';

import Button from '../../../../../../components/button/button';

import './add-class.scss'


class AddClass extends React.Component {
    constructor() {
        super();
        this.state = {
            classData: {
                title: '',
                description: '',
                thumbnail: '',
                duration: null,
                costPerDevice: null,
                mealKitCost: null,
                hasMealKit: false,
            },
            loading: false,
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({ loading: true });
        await this.props.addClass(this.state.classData);
        this.setState({ loading: false });
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState(prevState => ({
            classData: {
                ...prevState.classData,
                [name]: value,
            }
        }));
    }

    handleCheckBoxChange = (evt) => {
        const { name } = evt.target;
        let value = !this.state[name];
        this.setState(prevState => ({
            classData: {
                ...prevState.classData,
                [name]: value,
            },
        }));
    }

    handleFileUploadChange = (evt) => {
        const file = evt.target.files[0];
        const { name } = evt.target;

        this.setState(prevState => ({
            classData: {
                ...prevState.classData,
                [name]: file,
            }
        }));
    }

    showModal = () => {
        this.props.showAddClassModal();
    }

    closeModal = () => {
        this.props.hideAddClassModal();
    }

    render() {
        const { errors } = this.props;

        return (
            <div id='add-class' className='mt-5'>
                <Button className='mb-4 p-3' onClick={this.showModal}>Add Class</Button>
                <Modal size='lg' id='add-class-modal' show={this.props.shouldShowAddClassModal} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Add Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.classData.title}
                                    type='text'
                                    placeholder='title'
                                    name='title'
                                />
                                <span className='text-danger'>{errors['title']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.classData.description}
                                    type='text'
                                    as='textarea'
                                    placeholder='description'
                                    name='description'
                                />
                                <span className='text-danger'>{errors['description']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type='file'
                                    name='thumbnail'
                                    onChange={this.handleFileUploadChange}
                                />
                                <span className='text-danger'>{errors['thumbnail']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.classData.duration}
                                    type='number'
                                    placeholder='duration'
                                    name='duration'
                                />
                                <span className='text-danger'>{errors['duration']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.classData.costPerDevice}
                                    type='number'
                                    placeholder='cost per device'
                                    name='costPerDevice'
                                />
                                <span className='text-danger'>{errors['costPerDevice']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={this.state.classData.mealKitCost}
                                    type='number'
                                    placeholder='meal kit cost'
                                    name='mealKitCost'
                                />
                                <span className='text-danger'>{errors['mealKitCost']}</span>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Offers Meal Kit</Form.Label>
                                <Form.Check
                                    onChange={this.handleCheckBoxChange}
                                    value={this.state.classData.hasMealKit}
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

const mapStateToProps = (state) => {
    return {
        errors: state.chef.addClassErrors,
        shouldShowAddClassModal: state.chef.showAddClassModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addClass: (classData) => dispatch(addClass(classData)),
        showAddClassModal: () => dispatch(showAddClassModal()),
        hideAddClassModal: () => dispatch(hideAddClassModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClass);