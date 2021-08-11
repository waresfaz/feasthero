import React from 'react'
import DeleteClass from '../delete-class/delete-class'
import EditClass from '../edit-class/edit-class'

class ChefClassOptions extends React.Component {
    render() {
        const { classData } = this.props;
        return (
            <>
                <EditClass classData={classData} />
                <DeleteClass classData={classData} />
            </>
        )
    }
}

export default ChefClassOptions;