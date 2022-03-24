import React from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addClass, clearErrors, setShowAddClassModal } from '../../../../../../services/chef/actions';

import Button from '../../../../../../components/button/button';

import './add-class.scss'


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
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.props.addClass(this.state);
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

    showModal = () => {
        this.props.setShowAddClassModal(true);
    }

    closeModal = () => {
        this.props.setShowAddClassModal(false);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const { errors } = this.props;

        return (
            <div id='add-class' className='mt-5'>
                <Button className='mb-4 p-3' onClick={this.showModal}>Add Class</Button>
                <Modal size='lg' id='add-class-modal' show={this.props.showAddClassModal} onHide={this.closeModal}>
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
                                    type='file'
                                    name='thumbnail'
                                    onChange={this.handleFileUploadChange}
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
                                    onChange={this.handleCheckBoxChange}
                                    value={this.state.hasMealKit}
                                    name='hasMealKit'
                                />
                                <span className='text-danger'>{errors['hasMealKit']}</span>
                            </Form.Group>

                            <span className='text-danger d-block text-center'>{errors['error']}</span>

                            {
                                this.props.loading
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
        errors: state.chef.errors,
        loading: state.chef.loading,
        showAddClassModal: state.chef.showAddClassModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addClass: (classData) => dispatch(addClass(classData)),
        clearErrors: () => dispatch(clearErrors()),
        setShowAddClassModal: (showModal) => dispatch(setShowAddClassModal(showModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClass);