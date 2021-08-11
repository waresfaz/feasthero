import React from 'react'
import { Form } from 'react-bootstrap'

import Button from '../../../../../components/button/button'

class EditClass extends React.Component {
    render() {
        const { classData } = this.props;

        return (
            <>
                {JSON.stringify(classData)}
                <form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' defaultValue={classData.title} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' as='textarea' defaultValue={classData.description} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type='number' defaultValue={classData.duration} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control type='number' defaultValue={classData.cost} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Meal Kit Cost</Form.Label>
                        <Form.Control type='number' defaultValue={classData.mealKitCost} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Offers Meal Kit</Form.Label>
                        <Form.Check checked={classData.hasMealKit} />
                    </Form.Group>
                    <Button asButton={true} className='p-3 w-100'>Update</Button>
                </form>
            </>
        )
    }
}

export default EditClass;