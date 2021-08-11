import React from 'react'
import { Form } from 'react-bootstrap'

class EditClass extends React.Component {
    render() {
        const { classData } = this.props;

        return (
            <>
                <form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' defaultValue={classData.title} />
                    </Form.Group>
                </form>
            </>
        )
    }
}

export default EditClass;