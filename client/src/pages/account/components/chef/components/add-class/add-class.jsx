import React, { useReducer, useState } from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addClass, hideAddClassModal, showAddClassModal } from '../../../../../../services/chef/actions';

import Button from '../../../../../../components/button/button';

import './add-class.scss'

function addClassReducer(state, action) {
    switch (action.type) {
        case 'FIELD': {
            return {
                ...state,
                classData: {
                    ...state.classData,
                    [action.fieldName]: action.payload,
                }
            }
        }
        case 'ADD_CLASS_STARTED': {
            return {
                ...state,
                loading: true
            }
        }
        case 'ADD_CLASS_FINISHED': {
            return {
                ...state,
                loading: false,
            }
        }
        default: return state;
    }
}


function AddClass() {
    const [state, localDispatch] = useReducer(addClassReducer, { classData: {hasMealKit: false} });
    const errors = useSelector(state => state.chef.addClassErrors);
    const shouldShowAddClassModal = useSelector(state => state.chef.showAddClassModal);
    const [loading, setLoading] = useState(false);

    const reduxDispatch = useDispatch();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        await reduxDispatch(addClass(state.classData));
        setLoading(false);
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        localDispatch({
            type: 'FIELD',
            fieldName: [name],
            payload: [value],
        });
    }

    const handleCheckBoxChange = (evt) => {
        const { name } = evt.target;
        let value = !state[name];
        localDispatch({
            type: 'FIELD',
            fieldName: [name],
            payload: [value],
        });
    }


    const handleFileUploadChange = (evt) => {
        const file = evt.target.files[0];
        const { name } = evt.target;

        localDispatch({
            type: 'FIELD',
            fieldName: [name],
            payload: file,
        });
    }

    const showModal = () => {
        reduxDispatch(showAddClassModal());
    }

    const closeModal = () => {
        reduxDispatch(hideAddClassModal());
    }


    return (
        <div id='add-class' className='mt-5'>
            <Button className='mb-4 p-3' onClick={showModal}>Add Class</Button>
            <Modal size='lg' id='add-class-modal' show={shouldShowAddClassModal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Add Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={state.classData.title}
                                type='text'
                                placeholder='title'
                                name='title'
                            />
                            <span className='text-danger'>{errors['title']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={state.classData.description}
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
                                onChange={handleFileUploadChange}
                            />
                            <span className='text-danger'>{errors['thumbnail']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={state.classData.duration}
                                type='number'
                                placeholder='duration'
                                name='duration'
                            />
                            <span className='text-danger'>{errors['duration']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={state.classData.costPerDevice}
                                type='number'
                                placeholder='cost per device'
                                name='costPerDevice'
                            />
                            <span className='text-danger'>{errors['costPerDevice']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={state.classData.mealKitCost}
                                type='number'
                                placeholder='meal kit cost'
                                name='mealKitCost'
                            />
                            <span className='text-danger'>{errors['mealKitCost']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Offers Meal Kit</Form.Label>
                            <Form.Check
                                onChange={handleCheckBoxChange}
                                value={state.classData.hasMealKit}
                                name='hasMealKit'
                            />
                            <span className='text-danger'>{errors['hasMealKit']}</span>
                        </Form.Group>

                        <span className='text-danger d-block text-center'>{errors['error']}</span>

                        {
                            loading
                                ?
                                <div className='d-flex justify-content-center'>
                                    <Spinner animation='border' />
                                </div>
                                :
                                <></>
                        }


                        <Modal.Footer>
                            <Button className='modal-btn' secondary onClick={closeModal}>
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


export default AddClass;